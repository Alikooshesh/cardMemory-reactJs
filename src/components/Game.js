import Card from "./Card";
import {cardsData} from "../cards";
import {useEffect, useState} from "react";

function Game() {

    const [cards,setCards] = useState(cardsData)
    const [gameLock,setGameLock] = useState(false)


    const cardClick = (id) => {
        if (!gameLock){
            let tempcards = [...cards]
            const itemFinder = tempcards.findIndex(item => item.id === id)
            const isFlipped = tempcards[itemFinder].isFlipped

            tempcards[itemFinder] = {...tempcards[itemFinder] , isFlipped : !isFlipped , found : false}
            setCards([...tempcards])
        }
    }

    useEffect(()=> {
        const flippedCards = cards.filter(item => item.isFlipped === true && item.found === false)
        if (flippedCards.length === 2){
            if (flippedCards[0].name === flippedCards[1].name){
                found(flippedCards[0].id , flippedCards[1].id)
            }else {
                setGameLock(true)
                setTimeout(()=> {
                    setGameLock(false)
                    unFlippAllNotFounds()
                },1500)
            }
        }
    },[cards])

    function found(firstCardId , secondCardId) {
        let tempcards = [...cards]
        const itemFinder1 = tempcards.findIndex(item => item.id === firstCardId)
        const itemFinder2 = tempcards.findIndex(item => item.id === secondCardId)

        tempcards[itemFinder1].found = true
        tempcards[itemFinder2].found = true

        setCards([...tempcards])
    }

    function unFlippAllNotFounds(){
        let tempCards = [...cards]

        for (let i = 0; i < tempCards.length; i++) {
            if(tempCards[i].found === false){
                tempCards[i].isFlipped=false
            }
        }
        setCards([...tempCards])
    }

  return (
    <section className="memory-game">
        {cards.map(item => <Card key={item.id} card={item} onClick={()=> cardClick(item.id)}/> )}
    </section>
  );
}

export default Game;
