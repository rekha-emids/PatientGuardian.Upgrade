import React, { Component } from "react";
import { ImageBackground, View } from 'react-native';
import { connect } from 'react-redux';
import { CoreoText, CoreoHighlightButton, CoreoImage, ScreenCover } from '../../../components';
import { successTick, landing } from '../../../assets/images';
import styles from './styles';
import { navigateToScreenMainStack } from '../../../redux/navigation/actions';
import { PATH } from '../../../routes';
import { OverlayLoaderWrapper } from "../../../components/Base/Preloader/Preloader";
class OnboardingCompleted extends Component {
    render() {
        return (
            <ScreenCover style={styles.screenCoverStyle} showHeader={false}>
            <OverlayLoaderWrapper style={styles.screenCoverStyle} isLoading={this.props.isLoading}>
                <ImageBackground
                    source={landing}
                    style={styles.backgroundimage}
                >
                    <View style={styles.container}>
                        <View>
                            <View style={styles.iconview}>
                                <CoreoImage
                                    style={styles.icon}
                                    source={successTick}
                                />
                            </View>
                            <CoreoText style={[
styles.title,
styles.common,
styles.styleText
]}>You are successfully onboarded !</CoreoText>
                        </View>
                        <View style={styles.login}>
                             <CoreoHighlightButton
                                style={styles.button}
                                onPress={this.props.onClickContinue}
                                textStyle={[
styles.common,
styles.loginfont
]}
                                text="Continue"
                            />
                        </View>
                    </View>
                </ImageBackground>
                </OverlayLoaderWrapper>
            </ScreenCover>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {onClickContinue: () => dispatch(navigateToScreenMainStack(PATH.LOGIN_SCREEN))}
}

export default connect(null, mapDispatchToProps)(OnboardingCompleted);
