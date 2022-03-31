const dev =  {
    KATALK_TOP_FOLDER_NAME: '카카오톡',
    MAX_RETAIN_MESSAGES: 200,
    KATALK_MESSAGE_REGEXP:{
        'REGEXP_DATE': /^\d.*년\s*\d.*월\s*\d.*일.*/,
        'REGEXP_MESSAGE': /^(\[.*?\])\s?(\[.*?\])\s?((.|\n)*)/g
    },
    SOCKET_SERVER: 'https://autoeditdev.sbs.co.kr',
    EVENT_NEW_MESSAGES: 'post:newMessages',
}

const prd = {
    SOCKET_SERVER: ''
}

export default process.env.NODE_ENV === 'development' ? dev:prd;
