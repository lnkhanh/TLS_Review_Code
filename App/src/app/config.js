(function() {
    'user strict';
    // DEV
    // var cfgFB = {
    //     fbConnection: {
    //         apiKey: "AIzaSyBwe47tdq8MHfpH4h2SqkpSPnaTS-Owjn0",
    //         authDomain: "dev-texaslawshield.firebaseapp.com",
    //         databaseURL: "https://dev-texaslawshield.firebaseio.com",
    //         storageBucket: "dev-texaslawshield.appspot.com"
    //     }
    // };

    //QC
    var cfgFB = {
        fbConnection: {
            apiKey: "AIzaSyCHEZpm0TjDywd56MSeeYMEvn5MrdU_ZYw",
            authDomain: "qc-texaslawshield.firebaseapp.com",
            databaseURL: "https://qc-texaslawshield.firebaseio.com",
            storageBucket: "qc-texaslawshield.appspot.com"
        }
    };

    var cfgApp = {
        profileBlankImg: 'https://firebasestorage.googleapis.com/v0/b/smartapp-79daf.appspot.com/o/images%2Fuser_profile%2Fblank-image.png?alt=media&token=9ea874e3-21eb-4679-a98c-47fe1305e7e8',
        externalLogin: true,
        emailAffix: '@sysnify.com',
        fbDefaultPwd: 'Sysnify15',
        externalUrl: 'https://apiqa.texaslawshield.com/v1/tlsapi.php',
        // externalUrl: 'https://api.texaslawshield.com/v1/tlsapi.php',
        tlsPaymentTestMode: false,
        tlsApiKey: 'key666cardfligh666',
        tlsSource: 'CardFlight',
        tlsApiUserName: 'lnguyen',
        tlsApiPassword: '1nguy3N',
        elasticHost: 'http://eeb088900fa98346c39c3930c7990a3c.us-east-1.aws.found.io:9200/',
        elasticusAuth: 'elastic:cQnLKBIFxNkBClPVH6LcX9BN',
        buildVersion: 283101,
        buildOnDay: '07/30/2019', // format MM/DD/YYYY
        appVersion: '2.8.3',
        isDebug: false
    };

    var env = {};
    env.localweb = angular.extend({}, cfgFB, cfgApp);
    angular.module('app.config', []).constant('APP_CONFIG', env.localweb);
})();