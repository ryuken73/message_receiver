import React from 'react'
import styled from 'styled-components'
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import useAppState from 'hooks/useAppState';
import useSocketIO from 'hooks/useSocketIO';
import useKatalkTreeState from 'hooks/useKatalkTreeState';
import constants from 'config/constants';
const {SOCKET_SERVER_URL, EVENT_NEW_MESSAGES} = constants;

const LeftContainer = styled.div`
    box-sizing: border-box;
    height: 100%;
    background: #382121;
    text-align: left;
    padding-top: 20px;
`
function LeftPane() {
    const {setSocketConnected} = useAppState();
    const {socket} = useSocketIO({hostAddress: SOCKET_SERVER_URL, setSocketConnected});
    const {
        katalkTopFolder,
        katalkRooms,
        orderedKatalkRooms,
        initializeTopFolder,
        addKatalkRoom,
        addKatalkMessages,
        setSelecteNodeId
    } = useKatalkTreeState();

    const handleMessages = React.useCallback(newMessages => {
       const {room, messages}  = newMessages
       addKatalkRoom(room);
       addKatalkMessages(room, messages)
    },[addKatalkRoom, addKatalkMessages])

    const handleNodeSelect = React.useCallback((event, nodeId) => {
        setSelecteNodeId(nodeId)
    },[])

    React.useEffect(() => {
        initializeTopFolder();
    },[])

    React.useEffect(() => {
        if(socket === null) return;
        socket.on(EVENT_NEW_MESSAGES, handleMessages)
        return () => {
            socket.off(EVENT_NEW_MESSAGES, handleMessages)
        }
    },[socket, handleMessages])

    console.log(orderedKatalkRooms)

    return (
        <LeftContainer>
            <TreeView
            aria-label="file system navigator"
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
            sx={{ height: '100%', flexGrow: 1, overflowY: 'auto' }}
            expanded={["0"]}
            onNodeSelect={handleNodeSelect}
            >
                {katalkTopFolder.nodeId !== undefined ? (
                    <TreeItem nodeId={katalkTopFolder.nodeId} label={katalkTopFolder.name}>
                        {orderedKatalkRooms.map(katalkRoom => (
                            <TreeItem 
                                key={katalkRoom.nodeId}
                                nodeId={katalkRoom.nodeId} 
                                label={katalkRoom.roomName} 
                            />
                        ))}
                    </TreeItem>):
                    <div></div>
                }
                
            </TreeView>
        </LeftContainer>
    )
}

export default React.memo(LeftPane)
