import React, { Component } from "react";
import Title from "./Title";
import VideoPlayer from "./VideoPlayer";
import NoteList from "./NoteList";
import "../../styles/Workspace.css";
import { connect } from "react-redux";
import { selectSpace } from "../../actions/creators";
import { Layout, Row, Col, PageHeader } from "antd";
const { Content } = Layout;

// 들어오는 url (path)에 따라 redux의 current space를 업데이트
function updateCurrSpace(path, props, initial = true) {
  const currSpace = props.spaces.filter(space => space.name === path)[0];

  if (currSpace) {
    // path에 해당되는 space가 존재한다: no need to return 404
    if (initial) {
      // constructor 안에서 호출됐으면, 바로 할당
      this.state = { validPath: true };
    } else {
      // use setState otherwise
      this.setState({ validPath: true });
    }
    props.selectSpace(currSpace.id); // select the current space
  } else {
    // return 404 Not Found
    initial
      ? (this.state = { validPath: false })
      : this.setState({ validPath: false });
  }
}

class Workspace extends Component {
  constructor(props) {
    super(props);
    const { spaceName } = this.props.match.params;
    // Update the current space (or use {validPath: false} to return 404 page)
    updateCurrSpace.call(this, spaceName, props);
  }

  componentDidUpdate(prevProps) {
    const { spaceName } = this.props.match.params;
    const updateNeeded =
      prevProps.match.params.spaceName !== spaceName ||
      prevProps.spaces.length !== this.props.spaces.length;
    // First conditional determines whether the current space (url) has been changed
    // Second conditional handles async fetching (b/c props.spaces is initially an empty arr)
    if (updateNeeded) {
      updateCurrSpace.call(this, spaceName, this.props, false);
    }
  }

  render() {
    if (this.state.validPath) {
      return (
        <Layout style={{ padding: "24px 24px 24px 24px" }}>
          <PageHeader></PageHeader>
          <Content style={{ background: "white", padding: "16px 24px" }}>
            <Title spaceName={this.props.match.params.spaceName} />
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <VideoPlayer />
              </Col>
              <Col span={12}>
                <NoteList />
              </Col>
            </Row>
          </Content>
        </Layout>
      );
    } else {
      // The URL does not correspond to a workspace
      return <div>404: Workspace Not Found</div>;
    }
  }
}

const mapStateToProps = state => ({
  spaces: state.spaces
});

const mapDispatchToProps = dispatch => ({
  selectSpace: id => dispatch(selectSpace(id))
});

Workspace = connect(
  mapStateToProps,
  mapDispatchToProps
)(Workspace);
export default Workspace;
