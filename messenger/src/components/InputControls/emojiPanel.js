import React from 'react'
import emojis from './emoji.json'
import {emojiLookUp} from '../helpers'

const EmojiMapper = (text) => {
    const allEmoji = emojis.map((item,key) => {
        return(
            <span key={key} onClick={() => addEmoji(item.value,text)}>{item.value}</span>
        )
    })
    return allEmoji
}

const addEmoji = (emoji,text) => {
    var newMsg = text.props.text + emoji;
    text.props.handleEmoji(newMsg)
}

const emojiPanel = (props) => {
    return(
        <div className='emojiPanel-container'>
            <EmojiMapper props={props}/>
        </div>
    )
}

export default emojiPanel