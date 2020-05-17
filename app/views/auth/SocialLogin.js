import React from 'react';
import { View, NativeModules } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import { Image, SocialIcon, Text } from 'react-native-elements';
import ViewStyles from './styles';
import StylesConstant from '../../constants/styles';
import * as AppInfo from '../../constants/AppInfo';
import { LoginButton, AccessToken, LoginManager } from 'react-native-fbsdk';
import { LoginWithFacebook, LoginWithTwitter } from '../../actions/AuthActions';
import { connect } from 'react-redux';
import { TranslateString, ChooseStringByLanguage } from '../../util';
const { RNTwitterSignIn } = NativeModules

class SocialLogin extends React.PureComponent {
    redirectToApp() {
        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'mainFlow' })],
        });
        this.props.navigation.dispatch(resetAction);
    }

    loginWihFacebook() {
        LoginManager.logInWithPermissions(["public_profile", "email"]).then((result) => {
            console.log(result);
            if (result.isCancelled) {
                console.log("Login cancelled");
            } else {
                console.log("Login success with permissions: " + result.grantedPermissions.toString());

                AccessToken.getCurrentAccessToken().then((data) => {
                    let token = data.accessToken.toString();
                    this.props.LoginWithFacebook(token,data.userID, this.redirectToApp());
                });
            }
        },
            function (error) {
                console.log("Login fail with error: " + error);
            }
        );
    }
    async loginWithTiwtter() {
        try {
            await RNTwitterSignIn.init(AppInfo.TWITTER_COMSUMER_KEY, AppInfo.TWITTER_CONSUMER_SECRET);
            let loginData = await RNTwitterSignIn.logIn();
            const { authToken, authTokenSecret } = loginData
            if (authToken && authTokenSecret) {
                this.props.LoginWithTwitter(authToken, this.redirectToApp());
            }

        } catch (error) {
            console.log("Error in twitter :", error);
        }
    }
    render() {
        return (

            <View style={[ViewStyles.SocialContainer]}>
                <SocialIcon
                    fontFamily={StylesConstant.FontFamily}
                    fontStyle={{ fontFamily: StylesConstant.FontFamily, fontWeight: '500' }}
                    onPress={() => this.loginWihFacebook()}
                    style={{ flex: 1 }}
                    title={ChooseStringByLanguage("Facebook", "فيسبوك")}
                    button
                    type='facebook' />

                <SocialIcon
                    fontFamily={StylesConstant.FontFamily}
                    fontStyle={{ fontFamily: StylesConstant.FontFamily, fontWeight: '500' }}
                    style={{ flex: 1 }}
                    onPress={() => this.loginWithTiwtter()}
                    title={ChooseStringByLanguage("Twitter", "تويتر")}
                    button
                    type='twitter' />
            </View>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    LoginWithFacebook: (token, user_id,cb) => dispatch(LoginWithFacebook(token,user_id, cb)),
    LoginWithTwitter: (token, cb) => dispatch(LoginWithTwitter(token, cb))
})
export default connect(null, mapDispatchToProps)(SocialLogin);
