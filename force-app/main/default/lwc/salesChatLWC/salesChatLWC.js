import BaseChatMessage from 'lightningsnapin/baseChatMessage';
import { wire,track, api } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import notifyOwner from '@salesforce/apex/ChatUtility.notifyOwner';
import CHATINTERRUPT_OBJ from '@salesforce/schema/ChatInterrupt__c';
import MESSAGE_FIELD from '@salesforce/schema/ChatInterrupt__c.message__c';


const CHAT_CONTENT_CLASS = 'chat-content';
const AGENT_USER_TYPE = 'agent';
const CHASITOR_USER_TYPE = 'chasitor';
const SUPPORTED_USER_TYPES = [AGENT_USER_TYPE, CHASITOR_USER_TYPE];

/**
 * Displays a chat message using the inherited api messageContent and is styled based on the inherited api userType and messageContent api objects passed in from BaseChatMessage.
 */
export default class SalesChatLWC  extends BaseChatMessage {
    @track messageStyle = '';
    @track objId = '';
    @track messageContent;

    // this object have record information
    @track chatInt = {
        message : MESSAGE_FIELD
    };
    /*@wire(notifyOwner, {messageIn: 'test'}) 
        notifyOwner() {
            console.log('test');
        }
*/
    isSupportedUserType(userType) {
        return SUPPORTED_USER_TYPES.some((supportedUserType) => supportedUserType === userType);
    }

    connectedCallback() {
        console.log('Started');
        //if (messageContent.value.includes('Hi')) {
            //notifyOwner(messageContent.value);
        //}
        notifyOwner();
        this.handleSave();
        console.log(this.messageContent.value);
        if (this.isSupportedUserType(this.userType)) {
            this.messageStyle = `${CHAT_CONTENT_CLASS} ${this.userType}`;
        } else {
            throw new Error(`Unsupported user type passed in: ${this.userType}`);
        }
        console.log('ended');
    }

    handleSave() {
        const fields = {};

        fields[MESSAGE_FIELD.fieldApiName] = this.chatInt.message;
       
        // Creating record using uiRecordApi
        let recordInput = { apiName: CHATINTERRUPT_OBJ.objectApiName, fields }
        createRecord(recordInput)
        .then(result => {
            // Clear the user enter values
            this.chatInt = {};

            window.console.log('result ===> '+result);
        })
        .catch(error => {
            this.error = JSON.stringify(error);
        });
    }
}