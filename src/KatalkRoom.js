import React from 'react'
import styled, {keyframes, css} from 'styled-components'
import TreeItem from '@mui/lab/TreeItem';

const ShowUpdated = keyframes`
  from {
    color: yellow;
    font-weight: bold;
  }
  to {
    color: white;
  }
`
const updateStyle = css`
  animation-name: ${ShowUpdated};
  animation-delay: 0.5s;
  animation-duration: 5s;
  animation-fill-mode: both;
`
const StyledTreeItem = styled(TreeItem)`
    width: fit-content;
    .MuiTreeItem-content {
        width: fit-content;
        .MuiTreeItem-label {
            width: auto;
            padding-right: 5px;
        }
    }
    .MuiTreeItem-content.Mui-focused {
        background: transparent !important;
        .MuiTreeItem-label {
            border-radius: 3px;
            background: maroon;
        }
    }
    .MuiTreeItem-content.Mui-selected.Mui-focused {
        background: transparent !important;
        .MuiTreeItem-label {
            border-radius: 3px;
            background: maroon;
        }
    }
    .MuiTreeItem-content.Mui-selected {
        background: transparent !important;
        .MuiTreeItem-label {
            border-radius: 3px;
            background: maroon;
        }
    }
    ${props => (props.index === 0 && updateStyle)};
`

const KatalkRoom = props => {
    const {lastUpdatedTimestamp} = props;
    const [lastUpdated, setLastUpdated] = React.useState();
    React.useEffect(() => {
        setLastUpdated(lastUpdatedTimestamp)
    },[lastUpdatedTimestamp])
    return (
        <StyledTreeItem
            {...props}
        >
        </StyledTreeItem>
    )
}

export default React.memo(KatalkRoom)
