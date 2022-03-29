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
    height: 100%;
    background: darkslategrey;
    text-align: left;
    padding-top: 10px;
`
function LeftPane() {
    const {setSocketConnected} = useAppState();
    const {socket} = useSocketIO({hostAddress: SOCKET_SERVER_URL, setSocketConnected});
    const {
        katalkTopFolder,
        katalkRooms,
        addKatalkRoom,
        addKatalkMessages
    } = useKatalkTreeState();

    const handleMessages = React.useCallback(newMessages => {
       const {room, messages}  = newMessages
       addKatalkRoom(room);
       addKatalkMessages(room, messages)
    },[addKatalkRoom, addKatalkMessages])

    const handleNodeSelect = React.useCallback((event, nodeId) => {
        console.log(nodeId)
    },[])

    React.useEffect(() => {
        if(socket === null) return;
        socket.on(EVENT_NEW_MESSAGES, handleMessages)
        return () => {
            socket.off(EVENT_NEW_MESSAGES, handleMessages)
        }
    },[socket, handleMessages])

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
                {katalkTopFolder.id !== undefined ? (
                    <TreeItem nodeId={katalkTopFolder.id} label={katalkTopFolder.name}>
                        {katalkRooms.map(katalkRoom => (
                            <TreeItem 
                                nodeId={katalkRoom.id} 
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
