const Game = {
    canvas: null,
    ctx: null,
    problemDisplay: null,
    timerDisplay: null,
    numberButtons: null,
    inventoryDiv: null,
    levelUpMenu: null,
    gameOverMenu: null,
    continueButton: null,
    player: null,
    gameState: null,
    lastTime: 0,
    monsters: [],
    items: [],

    async init() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.problemDisplay = document.getElementById('problemDisplay');
        this.timerDisplay = document.getElementById('timerDisplay');
        this.numberButtons = document.getElementById('numberButtons');
        this.inventoryDiv = document.getElementById('inventory');
        this.levelUpMenu = document.getElementById('levelUpMenu');
        this.gameOverMenu = document.getElementById('gameOverMenu');
        this.continueButton = document.getElementById('continueButton');

        await this.loadData();
        this.setupPlayer();
        this.setupNumberButtons();
        this.startRoom();
        requestAnimationFrame(this.gameLoop.bind(this));
    },

    async loadData() {
        try {
            this.monsters = await (await fetch('json/monsters.json')).json();
            this.items = await (await fetch('json/items.json')).json();
        } catch (e) {
            console.error('Error loading JSON data:', e);
        }
    },

    setupPlayer() {
        this.player = {
            level: 1,
            hp: 100,
            maxHp: 100,
            attack: 20,
            xp: 0,
            inventory: [null, null, null, null, null],
            shield: 0,
            timeBonus: 0
        };
        this.gameState = {
            floor: 1,
            room: 0,
            roomsInFloor: Math.floor(Math.random() * 6) + 10,
            monsters: [],
            currentMonster: null,
            problem: null,
            timer: 10,
            state: 'combat',
            transition: false
        };
    },

    setupNumberButtons() {
        for (let i = 0; i < 10; i++) {
            const button = document.createElement('button');
            button.className = 'numberButton';
            button.textContent = i;
            button.onclick = () => this.checkAnswer(i);
            this.numberButtons.appendChild(button);
        }
    },

    generateProblem() {
        const monster = this.gameState.currentMonster;
        const op = monster.mathType;
        let a, b, answer;
        do {
            a = Math.floor(Math.random() * 9) + 1;
            answer = Math.floor(Math.random() * 10);
            if (op === "+") b = a + answer;
            else if (op === "-") b = a - answer;
            else if (op === "×") b = a * answer;
            else if (op === "÷") {
                b = a * answer;
                a = b * answer;
            }
        } while (b > 99 || b < 1 || (op === "÷" && answer === 0));
        return { a, op, b, answer };
    },

    spawnMonster() {
        const totalChance = this.monsters.reduce((sum, m) => sum + m.chance, 0);
        let rand = Math.random() * totalChance;
        let selectedMonster;
        for (let m of this.monsters) {
            rand -= m.chance;
            if (rand <= 0) {
                selectedMonster = m;
                break;
            }
        }
        return {
            name: selectedMonster.name,
            mathType: selectedMonster.mathType,
            hp: selectedMonster.baseHealth + 50 * this.gameState.floor,
            attack: selectedMonster.baseDamage + 5 * this.gameState.floor
        };
    },

    startRoom() {
        this.gameState.monsters = [];
        const monsterCount = Math.floor(Math.random() * 2) + 1;
        for (let i = 0; i < monsterCount; i++) {
            this.gameState.monsters.push(this.spawnMonster());
        }
        this.gameState.currentMonster = this.gameState.monsters[0];
        this.gameState.problem = this.generateProblem();
        this.gameState.timer = 10 + this.player.timeBonus;
        this.gameState.state = 'combat';
        this.updateUI();
    },

    updateUI() {
        this.problemDisplay.textContent = this.gameState.state === 'combat' && this.gameState.currentMonster ?
            `${this.gameState.problem.a} ${this.gameState.problem.op} _ = ${this.gameState.problem.b}` : '';
        this.timerDisplay.textContent = this.gameState.state === 'combat' ? `Time: ${this.gameState.timer.toFixed(1)}s` : '';
        this.numberButtons.style.display = this.gameState.state === 'combat' ? 'flex' : 'none';
        this.inventoryDiv.style.display = this.gameState.state === 'inventory' ? 'flex' : 'none';
        this.continueButton.style.display = this.gameState.state === 'inventory' ? 'block' : 'none';
        this.levelUpMenu.style.display = this.gameState.state === 'levelup' ? 'flex' : 'none';
        this.gameOverMenu.style.display = this.gameState.state === 'gameover' ? 'flex' : 'none';
        this.renderInventory();
    },

    renderInventory() {
        this.inventoryDiv.innerHTML = '';
        this.player.inventory.forEach((item, index) => {
            const slot = document.createElement('div');
            slot.className = 'inventorySlot';
            slot.textContent = item ? item.name : '';
            slot.onclick = () => this.useItem(index);
            this.inventoryDiv.appendChild(slot);
        });
    },

    useItem(index) {
        const item = this.player.inventory[index];
        if (!item) return;
        if (item.consumable) {
            if (item.effect === 'heal') {
                this.player.hp = Math.min(this.player.maxHp, this.player.hp + item.magnitude);
            } else if (item.effect === 'blockDamage') {
                this.player.shield = item.magnitude;
            }
            this.player.inventory[index] = null;
        } else {
            this.player.inventory[index] = null;
        }
        this.applyItemEffects();
        this.renderInventory();
        this.updateUI();
    },

    applyItemEffects() {
        this.player.attack = 20;
        this.player.timeBonus = 0;
        this.player.inventory.forEach(item => {
            if (item && !item.consumable) {
                if (item.effect === 'damageBoost') {
                    this.player.attack += item.magnitude;
                } else if (item.effect === 'timeBoost') {
                    this.player.timeBonus = item.magnitude;
                }
            }
        });
    },

    dropLoot() {
        const totalRarity = this.items.reduce((sum, i) => sum + i.rarity, 0);
        let rand = Math.random() * totalRarity;
        for (let item of this.items) {
            rand -= item.rarity;
            if (rand <= 0) {
                for (let i = 0; i < this.player.inventory.length; i++) {
                    if (!this.player.inventory[i]) {
                        this.player.inventory[i] = { ...item };
                        break;
                    }
                }
                break;
            }
        }
    },

    checkAnswer(answer) {
        if (this.gameState.state !== 'combat') return;
        if (answer === this.gameState.problem.answer) {
            const timeLeft = this.gameState.timer;
            const damage = timeLeft > 5 ? this.player.attack : this.player.attack * 0.5;
            this.gameState.currentMonster.hp -= damage;
            if (this.gameState.currentMonster.hp <= 0) {
                this.gameState.monsters.shift();
                this.player.xp += 10;
                this.dropLoot();
                if (this.gameState.monsters.length === 0) {
                    this.gameState.state = 'inventory';
                    if (this.gameState.room >= this.gameState.roomsInFloor) {
                        this.continueButton.textContent = 'Go Down';
                    } else {
                        this.continueButton.textContent = 'Next Room';
                    }
                } else {
                    this.gameState.currentMonster = this.gameState.monsters[0];
                    this.gameState.problem = this.generateProblem();
                    this.gameState.timer = 10 + this.player.timeBonus;
                }
            } else {
                this.gameState.problem = this.generateProblem();
                this.gameState.timer = 10 + this.player.timeBonus;
            }
        } else {
            if (this.player.shield > 0) {
                this.player.shield--;
            } else {
                this.player.hp -= this.gameState.currentMonster.attack;
            }
            this.gameState.problem = this.generateProblem();
            this.gameState.timer = 10 + this.player.timeBonus;
        }
        if (this.player.hp <= 0) {
            this.gameState.state = 'gameover';
            document.getElementById('gameOverFloor').textContent = this.gameState.floor;
        } else if (this.player.xp >= 50) {
            this.gameState.state = 'levelup';
            this.player.xp = 0;
        }
        this.updateUI();
    },

    levelUp(choice) {
        if (choice === 'hp') {
            this.player.maxHp += 10;
            this.player.hp += 10;
        } else if (choice === 'attack') {
            this.player.attack += 5;
        } else if (choice === 'heal') {
            this.player.hp = Math.min(this.player.maxHp, this.player.hp + 20);
        }
        this.player.level++;
        this.gameState.state = 'combat';
        if (this.gameState.monsters.length === 0) {
            this.gameState.state = 'inventory';
        }
        this.updateUI();
    },

    nextRoom() {
        this.gameState.transition = true;
        setTimeout(() => {
            this.gameState.transition = false;
            this.gameState.room++;
            if (this.gameState.room > this.gameState.roomsInFloor) {
                this.gameState.floor++;
                this.gameState.room = 1;
                this.gameState.roomsInFloor = Math.floor(Math.random() * 6) + 10;
            }
            this.startRoom();
        }, 500);
    },

    restartGame() {
        this.setupPlayer();
        this.startRoom();
    },

    gameLoop(time) {
        if (this.gameState.state === 'combat' && !this.gameState.transition) {
            this.gameState.timer -= (time - this.lastTime) / 1000;
            if (this.gameState.timer <= 0) {
                if (this.player.shield > 0) {
                    this.player.shield--;
                } else {
                    this.player.hp -= this.gameState.currentMonster.attack;
                }
                this.gameState.problem = this.generateProblem();
                this.gameState.timer = 10 + this.player.timeBonus;
                if (this.player.hp <= 0) {
                    this.gameState.state = 'gameover';
                    document.getElementById('gameOverFloor').textContent = this.gameState.floor;
                }
            }
        }
        this.lastTime = time;
        this.render();
        this.updateUI();
        requestAnimationFrame(this.gameLoop.bind(this));
    },

    render() {
        this.ctx.fillStyle = this.gameState.transition ? 'black' : `rgb(${200 - this.gameState.floor * 5}, ${200 - this.gameState.floor * 5}, ${200 - this.gameState.floor * 5})`;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Render player
        this.ctx.fillStyle = 'blue';
        this.ctx.fillRect(100, 400, 50, 50);
        this.ctx.fillStyle = 'white';
        this.ctx.fillText(`HP: ${this.player.hp}/${this.player.maxHp}`, 100, 380);

        // Render monster
        if (this.gameState.currentMonster) {
            this.ctx.fillStyle = 'red';
            this.ctx.fillRect(600, 400, 50, 50);
            this.ctx.fillStyle = 'white';
            this.ctx.fillText(`${this.gameState.currentMonster.name} HP: ${this.gameState.currentMonster.hp}`, 600, 380);
        }
    }
};