import { LightningElement, track } from 'lwc';
import { assignHandler, maximize } from 'lightningsnapin/minimized';

export default class SalesMinimizedLWC extends LightningElement {
    @track message;

    constructor() {
        super();

        // Assign handler per event.
        assignHandler("prechatState", this.setMinimizedMessage.bind(this));
        assignHandler("offlineSupportState", this.setMinimizedMessage.bind(this));
        assignHandler("waitingState", this.setMinimizedMessage.bind(this));
        assignHandler("queueUpdate", this.setMinimizedQueuePosition.bind(this));
        assignHandler("waitingEndedState", this.setMinimizedMessage.bind(this));
        assignHandler("chatState", this.setMinimizedChatState.bind(this));
        assignHandler("chatTimeoutUpdate", this.setMinimizedMessage.bind(this));
        assignHandler("chatUnreadMessage", this.setMinimizedMessage.bind(this));
        assignHandler("chatTransferringState", this.setMinimizedMessage.bind(this));
        assignHandler("chatEndedState", this.setMinimizedMessage.bind(this));
        assignHandler("reconnectingState", this.setMinimizedMessage.bind(this));
        assignHandler("postchatState", this.setMinimizedMessage.bind(this));
    }

    /**
     * Handler for when the minimized container is clicked.
     */
    handleClick() {
        maximize();
    }

    /**
     * Update the contents of the minimized message.
     *
     * @param {String} eventData - Contains a label attribute of the text to display.
     */
    setMinimizedMessage(eventData) {
        this.message = eventData.label;
    }

    /**
     * Update the contents of the minimized message with queue position label and value.
     *
     * @param {Object} eventData - Contains a label and a queue position attribute.
     */
    setMinimizedQueuePosition(eventData) {
        this.message = eventData.label;
        // For queue position = 0, the label will be "You're next!"
        if (eventData.queuePosition) {
            this.message += " " + eventData.queuePosition;
        }
    }

    /**
     * Update the contents of the minimized message with name of the agent.
     *
     * @param {Object} eventData - Contains an agent name attribute.
     */
    setMinimizedChatState(eventData) {
        this.message = eventData.agentName;
    }
}