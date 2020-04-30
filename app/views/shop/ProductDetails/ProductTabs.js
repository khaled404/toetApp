import React, { Component } from 'react'
import { View, StyleSheet, Dimensions } from 'react-native';
import { Container, Header, Tab, Tabs, ScrollableTab } from 'native-base';
import { TabView, SceneMap } from 'react-native-tab-view';
import CommonStyles from '../../../common/styles';

import SegmentedControlTab from "react-native-segmented-control-tab";

class ConsumerComponent extends Component {
    constructor() {
        super();
        this.state = {
            selectedIndex: 0
        };
    }

    handleIndexChange = index => {
        this.setState({
            ...this.state,
            selectedIndex: index
        });
    };
    renderView = () => {

       return (this.props.content[this.state.selectedIndex].view);

    }
    render() {
        let labels = this.props.content.map(e => e.label);
        return (
            <View style={{ alignItems: 'center' }}>
                <SegmentedControlTab
                    values={labels}
                    selectedIndex={this.state.selectedIndex}
                    onTabPress={this.handleIndexChange}
                    tabsContainerStyle={{ width: '80%', backgroundColor: '#e1e6ed', borderRadius:50 }}
                    tabStyle={{ height: 25, backgroundColor: '#e1e6ed', borderWidth: 0 ,borderRadius:20 }}
                    tabTextStyle={{ color: '#727C8E' }}
                    activeTabStyle={{ backgroundColor: '#fff' }}
                    firstTabStyle={{borderTopLeftRadius:20,borderBottomLeftRadius:20}}
                    lastTabStyle={{borderTopRightRadius:20,borderBottomRightRadius:20}}
                    activeTabTextStyle={[CommonStyles.MainColor]}
                />
                {this.renderView()}
            </View>
        );
    }
}
export default ConsumerComponent;