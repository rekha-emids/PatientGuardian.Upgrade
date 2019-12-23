/**
 * @flow
 */

import React, { PureComponent } from "react"
import PropTypes from "prop-types"
import { RefreshControl, FlatList, StyleSheet, View } from "react-native"

import {
  API_FETCHING,
  API_SUCCESS,
  API_PAGINATION_FETCHING,
  API_PAGINATION_FINISHED,
  API_REFRESH_FETCHING,
  REFRESH,
  API_INITIAL
} from "../../../constants/AppAPIConstants"

import { Spinner } from "../../Base/Preloader/Preloader"
import EmptyCaseHandler, { EmptyText } from "./EmptyCaseHandler"
import _ from 'lodash'
import { setValueBasedOnHeight } from "../../../utils/deviceDimensions";

const NO_ITEMS = "NO_ITEMS"
const PAGINATION_LOADER = "PAGINATION_LOADER"

const getNewData = data => {
  if (data !== undefined && data !== null && data.length > 0) {
    return data.map(item => item)
  }
  return []
}

const ITEMS_DYNAMIC = [NO_ITEMS, PAGINATION_LOADER]

class ListScroller extends PureComponent {
  state = {
    dataSource: [],
    endReached:false
  }
  isRefreshing = false
  componentWillMount() {
    const { children, data } = this.props

    let newData = getNewData(data)
    const customElements = React.Children.map(children, (item, index) => index)
    newData = customElements.concat(newData)
    this.setState({
      dataSource: newData
    })
    this.offset = {
      x: 0,
      y: 0
    }
  }

  componentWillReceiveProps(nextProps) {
    const { data } = nextProps
    let newData = getNewData(data)
    const { children } = nextProps
    const customElements = React.Children.map(children, (item, index) => index)
    newData = customElements.concat(newData)
    if (nextProps.networkCallStatus === API_PAGINATION_FETCHING) {
      newData = newData.concat([PAGINATION_LOADER])
    } else if (
      data &&
      data.length === 0 &&
      nextProps.networkCallStatus !== API_INITIAL
    ) {
      newData = newData.concat([NO_ITEMS])
    }

    this.setState({
      dataSource: newData,
      endReached:false
    })
  }

  onEndReached = () => {
    const { data, isPaginationEnabled, networkCallStatus } = this.props
    if (
      data &&
      data.length > 0 &&
      isPaginationEnabled &&
      networkCallStatus !== API_FETCHING &&
      networkCallStatus !== API_PAGINATION_FETCHING &&
      networkCallStatus !== API_REFRESH_FETCHING &&
      networkCallStatus !== API_PAGINATION_FINISHED &&
      !this.onEndReachedCalledDuringMomentum
    ) {
      this.props.onEndReached()
      this.onEndReachedCalledDuringMomentum = true;
    }
  }

  onScroll = e => {
    this.offset = e.nativeEvent.contentOffset
    this.props.onScroll(e)
  }
  onRefresh = () => {
    this.props.onRefresh(REFRESH)
  }

  scrollToIndex = index => {
    this.listView && this.listView.scrollToIndex({ index })
  }

  scrollTo = ({ x, y, animated = true }) => {
    const offset = this.props.isHorizontal ? x : y
    this.listView && this.listView.scrollToOffset({ offset, animated })
  }

  _renderEmptyView = () => {
    const { header, emptyViewComponent, noItemsText, emptyViewStyle, networkCallStatus } = this.props
    if (emptyViewComponent) return emptyViewComponent()
    return (
      <EmptyText
        fullLength={_.isNil(header)}
        style={[styles.emptyText, emptyViewStyle]}
        text={noItemsText}
        networkCallStatus={networkCallStatus}
      />
    )
  }

  renderRow = eachItem => {
    const { index, item } = eachItem
    const {
      renderComponent: RenderComponent,
      itemPropLabel,
      data,
      children,
      getKey,
      header,
      itemProps,
      style,
      ...other
    } = this.props
    const childrenLength = children.length !== undefined ? children.length : 1

    if (!_.isNil(header) && item === NO_ITEMS) {
      return this._renderEmptyView()
    }

    if (item === PAGINATION_LOADER) {
      this.setState({endReached:true})
      return null
    }

    if (children && index < children.length) {
      return children[index]
    } else if (childrenLength && index < childrenLength) {
      return children
    }
    let props = {}
    if (itemPropLabel) {
      props[itemPropLabel] = item
    } else {
      if (typeof item === "object") {
        props = { ...item }
      } else {
        props = { item }
        return null
      }
    }
    return (
      <View>
        <RenderComponent
          length={data.length}
          index={Number(index - childrenLength)}
          {...other}
          {...props}
          {...itemProps}
        />
      </View>
    )
  }
  _keyExtractor = (item, index) => {
    const { children, itemKey } = this.props
    const childrenLength = children.length !== undefined ? children.length : 1
    if (ITEMS_DYNAMIC.indexOf(item) > -1) {
      return item
    }

    if (index < childrenLength) return index

    let key = this.props.getKey(item)
    if (itemKey && item[itemKey]) {
      key = index + item[itemKey]
    }
    if (!key) {
      key = index + " "
    }
    return key
  }

  renderRefreshControl = () => {
    const { networkCallStatus } = this.props
    return (
      <RefreshControl
        refreshing={networkCallStatus === API_REFRESH_FETCHING}
        onRefresh={this.onRefresh}
      />
    )
  }

  getFilteredData = data => {
    const filteredData = []
    for (let index = 0; index < data.length; index++) {
      const item = data[index]
      if (!_.isNil(item)) {
        filteredData.push(item)
      }
    }
    return filteredData
  }

  renderFooter = () => {
    const {
      renderListScrollerFooter: RenderListScrollerFooter
    } = this.props
      return (
        <View style={{marginBottom:setValueBasedOnHeight(40)}}>
          <RenderListScrollerFooter />
  
        </View>
      )
  }

  render() {
    const {
      data,
      networkCallStatus,
      noItemsText,
      renderSeparator,
      style,
      isHorizontal,
      header,
      refreshControl,
      removeClippedSubviews,
      inverted,
      noItemsComponent: NoItemsComponent,
      emptyViewStyle,
      onEndReachedThreshold,
      emptyViewComponent
    } = this.props

    const listData = this.getFilteredData(this.state.dataSource)

    let extraProps = { removeClippedSubviews }
    if (refreshControl) {
      extraProps = {
        ...extraProps,
        refreshControl: this.renderRefreshControl()
      }
    }

    const listView = (
      <FlatList
        {...extraProps}
        ref={c => {
          this.listView = c
        }}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={this.props.showsVerticalScrollIndicator}
        contentContainerStyle={style}
        data={listData}
        extraData={this.state}
        keyExtractor={this._keyExtractor}
        renderItem={this.renderRow}
        ItemSeparatorComponent={renderSeparator}
        ListFooterComponent={this.renderFooter()}
        ListHeaderComponent={header}
        horizontal={isHorizontal}
        onScroll={this.onScroll}
        onEndReached={this.onEndReached}
        onEndReachedThreshold={onEndReachedThreshold}
        inverted={inverted}
        keyboardShouldPersistTaps={"always"}
        onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
      />
    )
    return (
      <EmptyCaseHandler
        items={data}
        text={noItemsText}
        networkCallStatus={networkCallStatus}
        onRefresh={refreshControl ? this.onRefresh : null}
        style={emptyViewStyle}
        emptyViewComponent={emptyViewComponent}
      >
        {listView}
        {this.state.endReached ? <View style={styles.paginationLoader}><Spinner /></View> : null}
     </EmptyCaseHandler>
    )
  }
}

const styles = StyleSheet.create({
  emptyText: {
    justifyContent: "center",
    alignItems: "center",
    minHeight: 100
  },
  paginationLoader: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  }
})

ListScroller.defaultProps = {
  style: { paddingBottom: 5 },
  onPress: () => { },
  renderSeparator: null, // () => {},
  itemPropLabel: "",
  itemProps: {},
  isHorizontal: false,
  onEndReached: () => { },
  onRefresh: () => { },
  header: () => { return null },
  renderListScrollerFooter: () => null, // () => {},
  children: [],
  isPaginationEnabled: false,
  networkCallStatus: API_SUCCESS,
  onScroll: () => { },
  refreshControl: true,
  noItemsText: "No results found.",
  getKey: item => item.id,
  showsVerticalScrollIndicator: false,
  inverted: false,
  onEndReachedThreshold: 0.01,
  emptyViewComponent: null
}

ListScroller.propTypes = {
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  renderComponent: PropTypes.func.isRequired,
  style: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.number
  ]),
  itemPropLabel: PropTypes.string,
  onPress: PropTypes.func,
  renderSeparator: PropTypes.func,
  isHorizontal: PropTypes.bool,
  onEndReached: PropTypes.func,
  onRefresh: PropTypes.func,
  header: PropTypes.func,
  renderListScrollerFooter: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  isPaginationEnabled: PropTypes.bool,
  networkCallStatus: PropTypes.number,
  refreshControl: PropTypes.bool,
  noItemsText: PropTypes.string,
  onScroll: PropTypes.func
}

export default ListScroller
