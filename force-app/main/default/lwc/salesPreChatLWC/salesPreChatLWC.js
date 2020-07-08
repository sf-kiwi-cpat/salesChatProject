import { api, track, wire } from 'lwc';
import { fireEvent } from 'c/pubsub';
import { CurrentPageReference } from 'lightning/navigation';
import BasePrechat from 'lightningsnapin/basePrechat';
import getWelcomeMessage from '@salesforce/apex/ChatUtility.getWelcomeMessage';
import getChatImagePath from '@salesforce/apex/ChatUtility.getChatImagePath';
import createVisitor from '@salesforce/apex/ChatUtility.createVisitor';

const CHAT_CONTENT_CLASS = 'chat-content';
const AGENT_USER_TYPE = 'agent';
const CHASITOR_USER_TYPE = 'chasitor';
const SUPPORTED_USER_TYPES = [AGENT_USER_TYPE, CHASITOR_USER_TYPE];
const COOKIE_KEY = 'SFDC_VISITOR_KEY';


export default class SalesPreChatLWC extends BasePrechat {
    @api prechatFields;
    @api backgroundImgURL;
    @api welcomeMessage;
    @api imagePath;
    @api visitorId = null;
    @api contactId;
    @api isRepeatVisitor = false;
    @track fields;
    @track namelist;
    @api originalTitle;
    @api timerId;

    @wire(CurrentPageReference) pageRef;

    @track messageStyle = CHAT_CONTENT_CLASS + ' ' + AGENT_USER_TYPE;

    @wire(getWelcomeMessage, {url: window.location.href, visitorId: '$visitorId'}) 
        getWelcomeMessage(resp) {
            console.log("getWelcomeMessage: " + resp != null && resp.data != null ? resp.data[0] : 'Null');
            if (resp.data)
            {
                this.welcomeMessage = resp.data[0];
                this.startTimer();
            }
        }

    @wire(getChatImagePath, {url: window.location.href}) 
        getChatImagePath(resp) {
            console.log("getChatImagePath: " + resp != null && resp.data != null ? resp.data : 'Null');
            this.imagePath = resp.data; 
        }

    isSupportedUserType(userType) {
        return SUPPORTED_USER_TYPES.some((supportedUserType) => supportedUserType === userType);
    }

    /**
     * Set the button label and prepare the prechat fields to be shown in the form.
     */
    connectedCallback() {
        console.log("window.document.title: " + window.document.title);
        this.originalTitle = window.document.title;
        console.log("this.originalTitle: " + this.originalTitle);
        this.checkCookie();  
        console.log("this.prechatFields:" + this.prechatFields);
        this.fields = this.prechatFields.map(field => {
            const { label, name, value, required, maxLength } = field;
        console.log("this.fields:" + this.fields);
            return { label, value, name, required, maxLength };
        });
        this.namelist = this.fields.map(field => field.name); 
    }

    /**
     * Focus on the first input after this component renders.
     */
    renderedCallback() {
        //this.template.querySelector("lightning-input").focus();
        var event = new CustomEvent('awesome', {
            bubbles: true,
            detail: {
              hazcheeseburger: true
            }
          });
        window.dispatchEvent(event);
    }

    /**
     * On clicking the 'Start Chatting' button, send a chat request.
     */
    handleStartChat() {
        this.stopTimer();
        this.template.querySelectorAll("lightning-input").forEach(input => {
            this.fields[this.namelist.indexOf(input.name)].value = input.value;
        });
        
        if (this.validateFields(this.fields).valid) {
            this.startChat(this.fields);
            var event = new CustomEvent('chatnow', {
                bubbles: true
              });
            window.dispatchEvent(event);
            fireEvent(this.pageRef, 'chatnow', null);
        } else {
            // Error handling if fields do not pass validation.
        }
    }


    setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires="+d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }
      
    getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i = 0; i < ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0) == ' ') {
            c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
          }
        }
        return "";
    }
      
    checkCookie() {
        console.log("checkCookie called");
        var id = this.getCookie(COOKIE_KEY);
        if (id != "") {
            console.log("checkCookie user found");
            this.isRepeatVisitor = true;
            this.visitorId = id;
            this.updateVisitorId();
        } else {
            console.log("checkCookie user NOT found");
            createVisitor({url: window.location.href})
                .then((result) =>  {
                    console.log("createvisitor returned");
                    id = result;
                    if (id != "" && id != null) {
                        this.setCookie(COOKIE_KEY, id, 365);
                        this.visitorId = id;
                        this.updateVisitorId();
                    }
                })
        }
        
    }

    updateVisitorId()
    {
        var event = new CustomEvent(
            "setVisitorID",
            {
                bubbles: true,
                detail: {
                    visitorId: this.visitorId
                }
            }
        );
        // Dispatch the event.
        window.dispatchEvent(event);
    }

    startTimer()
    {
        this.timerId = setInterval(this.updateTitle, 1000);
    }

    stopTimer()
    {
        // Clear the timer that is changing the title of the browser
        clearInterval(this.timerId);
        window.document.title = this.originalTitle;
    }

    updateTitle()
    {
        console.log("UpdateTitle Called: " + window.document.title);
        if (window.document.title === this.originalTitle)
        {
            window.document.title = "(1) " + this.welcomeMessage;
        }
        else {
            window.document.title = this.originalTitle;
        }
    }
}