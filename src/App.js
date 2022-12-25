import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import data from "./component/data";

let mainList = data;

function RandomListGenerator() {
    var arr = [];
    while (arr.length < 4) {
        var r = Math.floor(Math.random() * 19) + 1;
        if (arr.indexOf(r) === -1) arr.push(r);
    }
    return arr;
}



function App(props) {
    const [boxesNumber, setBoxesNumber] = useState(RandomListGenerator());
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [test, setTest] = useState("");
    const [pressed, setPressed] = useState([]);
    const [tl, setTl] = useState("");

    const increment = (e) => {
        setPressed(pressed.concat([e.target.textContent]));
        setTl(e.target.textContent);
    };

    const loadScore = () => {
        const localHighScore = JSON.parse(localStorage.getItem("score"));
        if (localHighScore) {
            const localHighScore = JSON.parse(localStorage.getItem("score"));
            setHighScore(localHighScore);
        } else {
            var hscore = highScore;
            localStorage.setItem("score", JSON.stringify(score));
        }
    };

    let check = {};
    useEffect(() => {
        var t = 0;
        const scoreAdd = () => {
            loadScore();
            pressed.map((item) => {
                if (check[item] == undefined) {
                    check[item] = 1;
                    if (score > highScore) {
                        localStorage.setItem("score", JSON.stringify(score));
                    }
                } else {
                    check[item]++;
                }
            });

            Object.keys(check).forEach(function (key, index) {
                if (check[key] < 2) {
                    window.setTimeout(() => {
                        setScore(score + 1);
                    }, 400);
                } else if (check[key] > 1) {
                    document.location.reload();
                }
            });
        };
        scoreAdd();
        //document.title = "Title" + pressed;
        setBoxesNumber(RandomListGenerator());
    }, [pressed]);


    return (
        <div>
            <ScoreDisplay score={score} highScore={highScore}></ScoreDisplay>
            <div className="all-box">
                <Block
                    src={mainList[boxesNumber[0]].src}
                    click={increment}
                    name={mainList[boxesNumber[0]].name}
                ></Block>
                <Block
                    src={mainList[boxesNumber[1]].src}
                    click={increment}
                    name={mainList[boxesNumber[1]].name}
                ></Block>
                <Block
                    src={mainList[boxesNumber[2]].src}
                    click={increment}
                    name={mainList[boxesNumber[2]].name}
                ></Block>
                <Block
                    src={mainList[boxesNumber[3]].src}
                    click={increment}
                    name={mainList[boxesNumber[3]].name}
                ></Block>
            </div>
        </div>
    );
}

function ScoreDisplay(props) {
    return (
        <div id="score-bar">
            <p className="score">Score:{props.score}</p>
            <p className="score">HighScore:{props.highScore}</p>
        </div>
    );
}

function Block(props) {
    return (
        <div className="block">
            <div className="img-cont">
                <img src={props.src} alt="" className="image-block" />
            </div>
            <button className="block-text" onClick={props.click}>
                {props.name}
            </button>
        </div>
    );
}


export default App;
