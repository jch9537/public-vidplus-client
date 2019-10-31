import React, { Component } from "react";
import Title from "./Title";
import VideoPlayer from "./VideoPlayer";
import NoteList from "./NoteList";
import "../../styles/Workspace.css";
import { connect } from "react-redux";
import { selectSpace } from "../../actions/creators";
import { Container, Row, Col } from "react-bootstrap";

// 들어오는 url (path)에 따라 redux의 current space를 업데이트
function updateCurrSpace(path, props, initial = true) {
  const currSpace = props.spaces.filter(space => space.name === path)[0];
  if (currSpace) {
    // path에 해당되는 space가 존재한다
    if (initial) {
      this.state = { validPath: true };
    } else {
      this.setState({ validPath: true });
    }
    props.selectSpace(currSpace.id);
  } else {
    initial
      ? (this.state = { validPath: false })
      : this.setState({ validPath: false });
  }
}

class Workspace extends Component {
  constructor(props) {
    super(props);
    // URI is decoded before coming into spaceName
    const { spaceName } = this.props.match.params;
    updateCurrSpace.call(this, spaceName, props);
  }

  componentDidUpdate(prevProps) {
    // On url redirect or reload (to different workspace)
    const { spaceName } = this.props.match.params;
    if (prevProps.match.params.spaceName !== spaceName) {
      updateCurrSpace.call(this, spaceName, this.props, false);
    }
  }

  render() {
    if (this.state.validPath) {
      return (
        <Container fluid={true}>
          <Row className="main-row">
            <div style={{ width: "150px", backgroundColor: "#44546A" }}></div>
            <Col style={{ backgroundColor: "#F9F4FD" }}>
              <Title spaceName={this.props.match.params.spaceName} />
              <Row>
                <Col>
                  <VideoPlayer />
                </Col>
                <Col>
                  <NoteList />
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      );
    } else {
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
