import React from "react";
import { observer } from "mobx-react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";

import Actions from "../actions/Actions";
import Store from "../stores/Store";

import { Loading } from "../components/Index";
import { Alexa } from "../components/Charts/Index";

const styles = theme => ({
  avatar: {
    float: 'left',
    height: 20,
    marginRight: 10,
    width: 20
  }
});

@observer
class AlexaRankingChart extends React.Component {
  componentWillMount() {
    Actions.updatePublicationList();
  }

  render() {
    if (Store.isLoading()) return <Loading />;
    // const { classes } = this.props;

    const getAllAlexaRankings = Store.getAllAlexaRankings;

    return (
      <div
        className="container"
      >

        {getAllAlexaRankings.map((publication, i) =>
          <Alexa
            name={publication.name}
            rankings={publication.rankings}
          />
        )}

      </div>
    )
  }
}

AlexaRankingChart.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AlexaRankingChart);
