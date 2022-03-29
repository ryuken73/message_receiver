import './App.css';
import SplitPane from 'react-split-pane';
import Header from 'Header';
import LeftPane from 'LeftPane';
import styled from 'styled-components';

const RightContainer = styled.div`
  height: 100%;
  background: darkslategrey;
`

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <SplitPane  split="horizontal" defaultSize={100} allowResize={false}>
          <Header></Header>
          <SplitPane split="vertical" defaultSize={450} minSize={450} maxSize={500} step={10}>
            <LeftPane></LeftPane>
            <RightContainer>Right</RightContainer>
          </SplitPane>
        </SplitPane>
      </header>
    </div>
  );
}

export default App;
