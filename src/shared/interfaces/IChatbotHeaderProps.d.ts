export default interface IChatbotHeaderProps { 
    type: 'bot' | 'agent';
    status: 'Online' | 'Offline';
    onMinimize: Function;
    onClose: Function;
}