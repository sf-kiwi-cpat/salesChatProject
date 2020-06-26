import { LightningElement } from 'lwc';
import '@salesforce/resourceUrl/eswMin';
import {loadStyle, loadScript } from 'lightning/platformResourceLoader';

export default class CommunityChat extends LightningElement {

    connectedCallback() {
        initESW(null);
    }

    //initESW = function(gslbBaseURL) {
    connectedCallback() {
		embedded_svc.settings.displayHelpButton = true; //Or false
		embedded_svc.settings.language = ''; //For example, enter 'en' or 'en-US'

		//embedded_svc.settings.defaultMinimizedText = '...'; //(Defaults to Chat with an Expert)
		//embedded_svc.settings.disabledMinimizedText = '...'; //(Defaults to Agent Offline)

		//embedded_svc.settings.loadingText = ''; //(Defaults to Loading)
		//embedded_svc.settings.storageDomain = 'yourdomain.com'; //(Sets the domain for your deployment so that visitors can navigate subdomains during a chat session)

		// Settings for Chat
		//embedded_svc.settings.directToButtonRouting = function(prechatFormData) {
			// Dynamically changes the button ID based on what the visitor enters in the pre-chat form.
			// Returns a valid button ID.
		//};
		//embedded_svc.settings.prepopulatedPrechatFields = {}; //Sets the auto-population of pre-chat form fields
		//embedded_svc.settings.fallbackRouting = []; //An array of button IDs, user IDs, or userId_buttonId
		//embedded_svc.settings.offlineSupportMinimizedText = '...'; //(Defaults to Contact Us)

		embedded_svc.settings.enabledFeatures = ['LiveAgent'];
		embedded_svc.settings.entryFeature = 'LiveAgent';

		embedded_svc.init(
			'https://de-jun20-project.my.salesforce.com',
			'https://sdodemo-main-166ce2cf6b6-172-1727160aa2b.force.com/professional',
			gslbBaseURL,
			'00D4S000000DxBm',
			'Chronos_Bot',
			{
				baseLiveAgentContentURL: 'https://c.la4-c1-ph2.salesforceliveagent.com/content',
				deploymentId: '5724S000000GozC',
				buttonId: '5734S000000GozI',
				baseLiveAgentURL: 'https://d.la4-c1-ph2.salesforceliveagent.com/chat',
				eswLiveAgentDevName: 'EmbeddedServiceLiveAgent_Parent04I3m000000CaZ0EAK_16d8487a138',
				isOfflineSupportEnabled: false
			}
		);
	}
    
}