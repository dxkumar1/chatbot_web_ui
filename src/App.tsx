

import store from "./shared/redux/store";
import { Provider } from "react-redux";
import {ChatbotFooter, ChatbotHeader, Modals, MessageList } from "./components";
import { SignalRProvider } from "./shared/context/SignalRContext";

const App=(props: { botConfig: any; })=> {


  return (

    <div id={'root'} className={'chatbot-wrapper'}>
    <SignalRProvider botConfig={props.botConfig}>
      <Provider store={store}>
        <div tabIndex={0}>
           <ChatbotHeader />
           
          <MessageList />
         
      
          <ChatbotFooter />  
        </div>
        <Modals />
      </Provider>
    </SignalRProvider>

    </div>
  );
}

export default App;
