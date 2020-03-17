//TODO: STEP 1 - Import the useState hook.
import React, { useState } from "react";
import "./App.css";
import BottomRow from "./BottomRow";

function App()
{
  //TODO: STEP 2 - Establish your application's state with some useState hooks.  You'll need one for the home score and another for the away score.

  const [homeScore, setHomeScore] = useState(0)
  const [awayScore, setAwayScore] = useState(0)
  const [quarter, setQuarter] = useState(1)
  const [down, setDown] = useState(1)
  const [ballOn, setBallOn] = useState(99)
  const [possessor, setPossessor] = useState('home')
  const [numPlays, setNumPlays] = useState(0)
  const [totalSecondsInQuarter, setTotalSecondsInQuarter] = useState(15*60)
  const [minutesInQuarter, setMinutesInQuarter] = useState(15)
  const [secondsInQuarter, setSecondsInQuarter] = useState(0)



  // if (tSeconds ===0){
  //   setTimer(`${tMinutes}:00`)
  // }

  function changeTime(){
    const secondsPassed = Math.floor(Math.random()*20)
    setTotalSecondsInQuarter(totalSecondsInQuarter - secondsPassed)
    setMinutesInQuarter(Math.floor(totalSecondsInQuarter/60))
    setSecondsInQuarter(totalSecondsInQuarter - minutesInQuarter*60)
  }

  function clickAction(team, amount)
  {
    if (team === 'home')

    { setHomeScore(homeScore + amount) }

    else if (team === 'away')

    { (setAwayScore(awayScore + amount)) }
  }

  function increment(what)
  {
    switch (what)
    {
      case 'down':
        if (down % 4 == 0)
        {
          setDown(1)
        }
        else { setDown(down + 1) }
        break

      case 'quarter':
        if (quarter % 4 == 0) { setQuarter(1) }
        else
        {
          setQuarter(quarter + 1)
        }
        break
    }
  }

function newGame(){
  setQuarter(1)
  setAwayScore(0)
  setHomeScore(0)
  setDown(1)
  setTotalSecondsInQuarter(15*60)
}


  function runPlay()
  {
    setNumPlays(numPlays + 1)
    console.log(numPlays)
    changeTime()
    if (totalSecondsInQuarter <1 && quarter ===4){
      alert(`We have ourselves a winner! Congratulations ${possessor} team, by a margin of ${Math.abs(homeScore-setAwayScore)}. Let's play again!`)
      newGame()
    }
    else if (totalSecondsInQuarter <1){
      setQuarter(quarter +1)
      setTotalSecondsInQuarter(15*60)
    }

    const yardsRan = Math.floor(Math.random() * 30)  // random between 0-30

    if (yardsRan > ballOn)  // if more than enough to score
    {
      setBallOn(99)   // make yards to go == zero
      console.log(`Touchdown ${possessor}!`)
      if (possessor === 'home')
      {
        setHomeScore(homeScore + 7)
        setPossessor('away')
      }
      else
      {
        setAwayScore(awayScore + 7)
        setPossessor('home')
      }
      setDown(1)
    }
    else
    {
      if (down === 4)
      {
        setBallOn(75)
        if (possessor === 'home') { setPossessor('away') } else
        {
          setPossessor('home')
        }
        setDown(1)
      }
      else
      {
        setBallOn(ballOn - yardsRan)
        increment('down')
      }
    }


  }





  // REFACTORED
  // function upQuarter()
  // {
  //   if (quarter % 4 == 0) { setQuarter(1) }
  //   else { setQuarter(quarter + 1) }
  // }

  // function upDown()
  // {
  //   if (down % 4 == 0) { setDown(1) }
  //   else { setDown(down + 1) }
  // }



  return (
    <div className="container">
      <section className="scoreboard">
        <div className="topRow">
          <div className="home">
            <h2 className="home__name">Lions</h2>

            {/* TODO STEP 3 - We need to change the hardcoded values in these divs to accept dynamic values from our state. */}

            <div className="home__score">{homeScore}</div>
          </div>
          <div className="timer">{minutesInQuarter}:{secondsInQuarter}</div>
          <div className="away">
            <h2 className="away__name">Tigers</h2>
            <div className="away__score">{awayScore}</div>
          </div>
        </div>
        <BottomRow down={down} quarter={quarter} ballOn={ballOn} possessor={possessor} />
      </section>
      <section className="buttons">
        <div className="homeButtons">
          {/* TODO STEP 4 - Now we need to attach our state setter functions to click listeners. */}
          <button className="homeButtons__touchdown" onClick={() => clickAction('home', 7)}>Home Touchdown</button>
          <button className="homeButtons__fieldGoal" onClick={() => clickAction('home', 3)}>Home Field Goal</button>
        </div>
        <div className="awayButtons">
          <button className="awayButtons__touchdown" onClick={() => clickAction('away', 7)}>Away Touchdown</button>
          <button className="awayButtons__fieldGoal" onClick={() => clickAction('away', 3)}>Away Field Goal</button>
        </div>
        <button className="downup" onClick={() => increment('down')}>Next Down</button>
        <button className="quarterup" onClick={() => increment('quarter')}>Increment quarter</button>
        <button className="yards" onClick={() => runPlay()}>Run a play</button>
        <button className="yards" onClick={() => newGame()}>Start Over</button>


      </section>
    </div>
  );
}

export default App;
