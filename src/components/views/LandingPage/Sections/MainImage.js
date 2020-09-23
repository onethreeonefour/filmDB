import React from 'react'
import { Typography } from 'antd';

const { Title } = Typography

function MainImage(props) {
    return (
        <div style={{
            background: `
                linear-gradient(to bottom, rgba(0,0,0,0)
                39%, rgba(0,0,0,0.15)
                41%, rgba(0,0,0,0.95)
                100%),
                url('${props.image}'), #1c1c1c`,
            height: '750px',
            backgroundSize: '100%, cover',
            backgroundPosition: 'center,center',
            width: '100%',
            position: 'relative'
        }}>
            <div style={{ position: 'absolute', maxWidth: '500px', bottom: '2rem', marginLeft: '1.25rem' }}>
                <Title style={{ color: 'white' }} level={1}>{props.title}</Title>
                <p>{props.text}</p>
            </div>

        </div>
    )
}

export default MainImage
