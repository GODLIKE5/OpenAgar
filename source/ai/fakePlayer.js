"use strict";
/*
    OpenAgar - Open source web game
    Copyright (C) 2016 Andrew S

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as published
    by the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
module.exports = class Bot {
    constructor(server, id, name, botid) {
        this.id = id
        this.botid = botid
        this.server = server;
        this.isBot = true;
        this.mouse = {
            x: 0,
            y: 0
        }
        this.center = {
            x: 0,
            y: 0
        }
        this.owning = [];
        this.mass = 0;

        this.gameData = {
            name: name,
            color: server.getRandomColor(),
            chatname: "",
            reservedChatNames: [],
            chkDeath: false
        }
        this.score = 0;
        var t = new Date()
        this.alive = t.getTime()
        this.cells = [];

    }
    onRemove(main) {

    }
    addCell(cell) {
        if (this.cells.indexOf(cell) != -1) return;
        this.cells.push(cell)

    }
    kick() {
        this.server.removeBot(this)
    }

    onDeath() {
        this.mass = 0;
        this.score = 0;

        this.playing = false;

    }
    onSpawn() {

        if (this.playing) return
        this.alive = this.server.timer.time;
        this.playing = true;
    }
    getScore(re) {

        if (re) {
            var l = 0;
            this.cells.forEach((n) => {
                l += n.mass;
            })
            this.mass = l;
            this.score = Math.max(this.score, l)
            return l
        }
        this.score = Math.max(this.score, this.mass)
        return this.score
    }
    calcView() {

    }
    setRandom() {

    }
    update() {


    }
    changeColor(color) {
        this.gameData.color = color
        this.cells.forEach((cell) => {
            cell.color = color
        })

    }
    changeName(name) {
        this.gameData.name = name
        this.cells.forEach((cell) => {
            cell.name = name
        })

    }
    removeCell(cell) {
        var a = this.cells.indexOf(cell)
        if (a != -1) this.cells.splice(a, 1)
        if (this.cells.length == 0) this.onDeath()
    }

}