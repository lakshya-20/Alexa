const Alexa = require('ask-sdk-core');

const ACTIONS=[
            'rock',
            'paper',
            'scissor'
        ];

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = 'Welcome to rock paper scissor. What do you choose?';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
const GameIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'GameIntent';
    },
    handle(handlerInput) {
        
        const userAction = handlerInput.requestEnvelope.request.intent.slots.action.value;
        
        let speakOutput = '';
        let repromptOutput =' What is your next move?';
        
        const alexaAction=ACTIONS[Math.floor(Math.random()*ACTIONS.length)];

        const combo = userAction+alexaAction;

        switch(combo)
        {
            case 'rockrock':
                speakOutput+="you played rock and i played rock, it is a tie! ";
                break;
            case 'rockpaper':
                speakOutput+="you played rock and i played paper, I win! ";
                break;
            case 'rockscissor':
                speakOutput+="you played rock and i played scissor, you win! congratulations ";
                break;
            case 'paperrock':
                speakOutput+="you played paper and i played rock, you win! congratulations ";
                break;
            case 'paperpaper':
                speakOutput+="you played paper and i played paper, it is a tie! ";
                break;
            case 'paperscissor':
                speakOutput+="you played paper and i played scissor, I win! ";
                break;
            case 'scissorrock':
                speakOutput+="you played scissor and i played rock, I win! ";
                break;
            case 'scissorpaper':
                speakOutput+="you played scissor and i played paper, you win! congratulations ";
                break;
            case 'scissorscissor':
                speakOutput+="you played scissor and i played scissor, it is a tie! ";
                break;
            default:
                 break;
        }
        return handlerInput.responseBuilder
            .speak(speakOutput + repromptOutput)
            .reprompt(repromptOutput)
            .getResponse();
    }
};
const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'This is a skill to play rock paper scissor. What do you choose?';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = 'Goodbye!';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        return handlerInput.responseBuilder.getResponse();
    }
};

const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};

const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`~~~~ Error handled: ${error.stack}`);
        const speakOutput = `Sorry, I had trouble doing what you asked. Please try again.`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        GameIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler,
    )
    .addErrorHandlers(
        ErrorHandler,
    )
    .lambda();
