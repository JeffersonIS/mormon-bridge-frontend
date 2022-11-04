import React from 'react';
import './facecard.css';

import hearts_ace from './Deck/hearts_ace.png';
import hearts_2 from './Deck/hearts_2.png';
import hearts_3 from './Deck/hearts_3.png';
import hearts_4 from './Deck/hearts_4.png';
import hearts_5 from './Deck/hearts_5.png';
import hearts_6 from './Deck/hearts_6.png';
import hearts_7 from './Deck/hearts_7.png';
import hearts_8 from './Deck/hearts_8.png';
import hearts_9 from './Deck/hearts_9.png';
import hearts_10 from './Deck/hearts_10.png';
import hearts_jack from './Deck/hearts_jack.png';
import hearts_queen from './Deck/hearts_queen.png';
import hearts_king from './Deck/hearts_king.png';

import diamonds_ace from './Deck/diamonds_ace.png';
import diamonds_2 from './Deck/diamonds_2.png';
import diamonds_3 from './Deck/diamonds_3.png';
import diamonds_4 from './Deck/diamonds_4.png';
import diamonds_5 from './Deck/diamonds_5.png';
import diamonds_6 from './Deck/diamonds_6.png';
import diamonds_7 from './Deck/diamonds_7.png';
import diamonds_8 from './Deck/diamonds_8.png';
import diamonds_9 from './Deck/diamonds_9.png';
import diamonds_10 from './Deck/diamonds_10.png';
import diamonds_jack from './Deck/diamonds_jack.png';
import diamonds_queen from './Deck/diamonds_queen.png';
import diamonds_king from './Deck/diamonds_king.png';

import spades_ace from './Deck/spades_ace.png';
import spades_2 from './Deck/spades_2.png';
import spades_3 from './Deck/spades_3.png';
import spades_4 from './Deck/spades_4.png';
import spades_5 from './Deck/spades_5.png';
import spades_6 from './Deck/spades_6.png';
import spades_7 from './Deck/spades_7.png';
import spades_8 from './Deck/spades_8.png';
import spades_9 from './Deck/spades_9.png';
import spades_10 from './Deck/spades_10.png';
import spades_jack from './Deck/spades_jack.png';
import spades_queen from './Deck/spades_queen.png';
import spades_king from './Deck/spades_king.png';

import clubs_ace from './Deck/clubs_ace.png';
import clubs_2 from './Deck/clubs_2.png';
import clubs_3 from './Deck/clubs_3.png';
import clubs_4 from './Deck/clubs_4.png';
import clubs_5 from './Deck/clubs_5.png';
import clubs_6 from './Deck/clubs_6.png';
import clubs_7 from './Deck/clubs_7.png';
import clubs_8 from './Deck/clubs_8.png';
import clubs_9 from './Deck/clubs_9.png';
import clubs_10 from './Deck/clubs_10.png';
import clubs_jack from './Deck/clubs_jack.png';
import clubs_queen from './Deck/clubs_queen.png';
import clubs_king from './Deck/clubs_king.png';

import abstract from './Deck/abstract.png';
import frog from './Deck/frog.png';
import fish from './Deck/fish.png';
import astronaut from './Deck/astronaut.png';
import castle from './Deck/castle.png';
import red from './Deck/red.png';
import abstract_scene from './Deck/abstract_scene.png';

function FaceCard(props){
    let num = Number(props.cardNum);
    // const deck = [
    //     hearts_2, hearts_3, hearts_4, hearts_5, hearts_6, hearts_7, hearts_8, hearts_9, hearts_10, hearts_jack, hearts_queen, hearts_king, hearts_ace,
    //     diamonds_2, diamonds_3, diamonds_4, diamonds_5, diamonds_6, diamonds_7, diamonds_8, diamonds_9, diamonds_10, diamonds_jack, diamonds_queen, diamonds_king, diamonds_ace,
    //     spades_2, spades_3, spades_4, spades_5, spades_6, spades_7, spades_8, spades_9, spades_10, spades_jack, spades_queen, spades_king, spades_ace,
    //     clubs_2, clubs_3, clubs_4, clubs_5, clubs_6, clubs_7, clubs_8, clubs_9, clubs_10, clubs_jack, clubs_queen, clubs_king, clubs_ace,
    //     fish, abstract_scene, astronaut, castle, frog, red, red2
    // ]

    return(
        <> 
            {num === 1 && <img className={`${props.classString}`} src={hearts_2} alt='facecard'/>}
            {num === 2 && <img className={`${props.classString}`} src={hearts_3} alt='facecard'/>}
            {num === 3 && <img className={`${props.classString}`} src={hearts_4} alt='facecard'/>}
            {num === 4 && <img className={`${props.classString}`} src={hearts_5} alt='facecard'/>}
            {num === 5 && <img className={`${props.classString}`} src={hearts_6} alt='facecard'/>}
            {num === 6 && <img className={`${props.classString}`} src={hearts_7} alt='facecard'/>}
            {num === 7 && <img className={`${props.classString}`} src={hearts_8} alt='facecard'/>}
            {num === 8 && <img className={`${props.classString}`} src={hearts_9} alt='facecard'/>}
            {num === 9 && <img className={`${props.classString}`} src={hearts_10} alt='facecard'/>}
            {num === 10 && <img className={`${props.classString}`} src={hearts_jack} alt='facecard'/>}
            {num === 11 && <img className={`${props.classString}`} src={hearts_queen} alt='facecard'/>}
            {num === 12 && <img className={`${props.classString}`} src={hearts_king} alt='facecard'/>}
            {num === 13 && <img className={`${props.classString}`} src={hearts_ace} alt='facecard'/>}

            {num === 14 && <img className={`${props.classString}`} src={diamonds_2} alt='facecard'/>}
            {num === 15 && <img className={`${props.classString}`} src={diamonds_3} alt='facecard'/>}
            {num === 16 && <img className={`${props.classString}`} src={diamonds_4} alt='facecard'/>}
            {num === 17 && <img className={`${props.classString}`} src={diamonds_5} alt='facecard'/>}
            {num === 18 && <img className={`${props.classString}`} src={diamonds_6} alt='facecard'/>}
            {num === 19 && <img className={`${props.classString}`} src={diamonds_7} alt='facecard'/>}
            {num === 20 && <img className={`${props.classString}`} src={diamonds_8} alt='facecard'/>}
            {num === 21 && <img className={`${props.classString}`} src={diamonds_9} alt='facecard'/>}
            {num === 22 && <img className={`${props.classString}`} src={diamonds_10} alt='facecard'/>}
            {num === 23 && <img className={`${props.classString}`} src={diamonds_jack} alt='facecard'/>}
            {num === 24 && <img className={`${props.classString}`} src={diamonds_queen} alt='facecard'/>}
            {num === 25 && <img className={`${props.classString}`} src={diamonds_king} alt='facecard'/>}
            {num === 26 && <img className={`${props.classString}`} src={diamonds_ace} alt='facecard'/>}

            {num === 27 && <img className={`${props.classString}`} src={spades_2} alt='facecard'/>}
            {num === 28 && <img className={`${props.classString}`} src={spades_3} alt='facecard'/>}
            {num === 29 && <img className={`${props.classString}`} src={spades_4} alt='facecard'/>}
            {num === 30 && <img className={`${props.classString}`} src={spades_5} alt='facecard'/>}
            {num === 31 && <img className={`${props.classString}`} src={spades_6} alt='facecard'/>}
            {num === 32 && <img className={`${props.classString}`} src={spades_7} alt='facecard'/>}
            {num === 33 && <img className={`${props.classString}`} src={spades_8} alt='facecard'/>}
            {num === 34 && <img className={`${props.classString}`} src={spades_9} alt='facecard'/>}
            {num === 35 && <img className={`${props.classString}`} src={spades_10} alt='facecard'/>}
            {num === 36 && <img className={`${props.classString}`} src={spades_jack} alt='facecard'/>}
            {num === 37 && <img className={`${props.classString}`} src={spades_queen} alt='facecard'/>}
            {num === 38 && <img className={`${props.classString}`} src={spades_king} alt='facecard'/>}
            {num === 39 && <img className={`${props.classString}`} src={spades_ace} alt='facecard'/>}

            {num === 40 && <img className={`${props.classString}`} src={clubs_2} alt='facecard'/>}
            {num === 41 && <img className={`${props.classString}`} src={clubs_3} alt='facecard'/>}
            {num === 42 && <img className={`${props.classString}`} src={clubs_4} alt='facecard'/>}
            {num === 43 && <img className={`${props.classString}`} src={clubs_5} alt='facecard'/>}
            {num === 44 && <img className={`${props.classString}`} src={clubs_6} alt='facecard'/>}
            {num === 45 && <img className={`${props.classString}`} src={clubs_7} alt='facecard'/>}
            {num === 46 && <img className={`${props.classString}`} src={clubs_8} alt='facecard'/>}
            {num === 47 && <img className={`${props.classString}`} src={clubs_9} alt='facecard'/>}
            {num === 48 && <img className={`${props.classString}`} src={clubs_10} alt='facecard'/>}
            {num === 49 && <img className={`${props.classString}`} src={clubs_jack} alt='facecard'/>}
            {num === 50 && <img className={`${props.classString}`} src={clubs_queen} alt='facecard'/>}
            {num === 51 && <img className={`${props.classString}`} src={clubs_king} alt='facecard'/>}
            {num === 52 && <img className={`${props.classString}`} src={clubs_ace} alt='facecard'/>}

            {num === 53 && <img className={`${props.classString}`} src={fish} alt='facecard'/>}
            {num === 54 && <img className={`${props.classString}`} src={abstract_scene} alt='facecard'/>}
            {num === 55 && <img className={`${props.classString}`} src={astronaut} alt='facecard'/>}
            {num === 56 && <img className={`${props.classString}`} src={castle} alt='facecard'/>}
            {num === 57 && <img className={`${props.classString}`} src={frog} alt='facecard'/>}
            {num === 58 && <img className={`${props.classString}`} src={red} alt='facecard'/>}
            {num === 59 && <img className={`${props.classString}`} src={abstract} alt='facecard'/>}
        </>  
    )
}

export default FaceCard;