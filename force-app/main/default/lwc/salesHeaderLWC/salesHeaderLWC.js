import BaseChatHeader from 'lightningsnapin/baseChatHeader';
import { registerListener } from 'c/pubsub';

export default class Header extends BaseChatHeader {
    /**
     * Text to display in h2 element.
     * @type {string}
     */
    text;

    /**
     * Set handlers for events from the sidebar.
     */
    connectedCallback() {

        registerListener('chatnow', this.handleChatNow, this);
        
        this.assignHandler("prechatState", (data) => {
            this.setText(data.label);
        });
        this.assignHandler("offlineSupportState", (data) => {
            this.setText(data.label);
        });
        this.assignHandler("waitingState", (data) => {
            this.setText(data.label);
        });
        this.assignHandler("waitingEndedState", (data) => {
            this.setText(data.label);
        });
        this.assignHandler("chatState", (data) => {
            this.setText(data.label);
        });
        this.assignHandler("chatTimeoutUpdate", (data) => {
            this.setText("You will time out soon.");
        });
        this.assignHandler("chatTimeoutClear", (data) => {
            this.setText(data.label);
        });
        this.assignHandler("chatEndedState", (data) => {
            this.setText(data.label);
        });
        this.assignHandler("reconnectingState", (data) => {
            this.setText(data.label);
        });
        this.assignHandler("postchatState", (data) => {
            this.setText(data.label);
        });
        this.assignHandler("chatConferenceState", (data) => {
            this.setText(data.label);
        });
    }

    /**
     * Focus on the first input after this component renders.
     */
    renderedCallback() {
    }

    disconnectCallback() {
        unregisterAllListeners(this);
    }

    setText(str) {
        if (typeof str !== "string") {
            throw new Error("Expected text value to be a `String` but received: " + str + ".");
        }
        this.text = str;
    }

    handleChatNow() {
        console.log('Notification chatnow event');
            this.template.querySelector(".hidden").forEach(div => {
                div.style.visibility = "visible";
            });
    }
}