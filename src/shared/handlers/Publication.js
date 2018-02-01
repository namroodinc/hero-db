import React from "react";
import { observer } from 'mobx-react';
import PropTypes from "prop-types";
import Card, { CardContent } from "material-ui/Card";
import { Grid, Paper } from "material-ui";
import Tabs, { Tab } from "material-ui/Tabs";
import ReactHtmlParser from "react-html-parser";
import Marked from "marked";

import Actions from "../actions/Actions";
import Store from "../stores/Store";
import { Loading, Rating } from "../components/Index";
import { Timeline } from "../components/Data/Index";
import { Latest, News } from "../components/Icons/Index";

@observer
class Publication extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0
    }
  }

  componentWillMount() {
    Actions.getEntry(this.props.match.params.entryId);
  }

  handleChange = (event, value) => {
    this.setState({
      value
    });
  };

  render() {
    if (Store.isLoading()) return <Loading />;

    const {
      articles,
      description,
      disambiguation,
      independentPressStandardsOrganisation,
      ipsoList,
      overallRating,
      name,
      siteRankings,
      twitterAccounts
    } = Store.retrieveEntry();

    const backgroundColor = twitterAccounts[0].backgroundColor;
    const publicationDescription = description || '';
    const ipsoListJoin = ipsoList.map(item => item.id).join(',');

    const timeline = [
      ...articles,
      ...[independentPressStandardsOrganisation],
      ...overallRating,
      ...siteRankings
    ];

    return (
      <div>

        <div
          className="container"
        >

          <Grid
            container
            spacing={24}
          >

            <Grid
              item
              xs={5}
            >
              <Paper>
                <h2>
                  {name}
                </h2>

                <h5>
                  {disambiguation}
                </h5>

                {ReactHtmlParser(Marked(publicationDescription))}
              </Paper>
            </Grid>

            <Grid
              item
              xs={7}
            >

              <Paper>
                <Tabs
                  value={this.state.value}
                  onChange={this.handleChange}
                  indicatorColor="primary"
                  textColor="primary"
                  centered
                >
                  <Tab
                    label={<Latest />}
                  />
                  <Tab
                    label={<News />}
                  />
                </Tabs>
              </Paper>

              <Paper>
                <Timeline
                  backgroundColor={backgroundColor}
                  data={timeline}
                  ipsoList={ipsoListJoin}
                  title="Latest"
                />
              </Paper>

            </Grid>

          </Grid>

        </div>

        <div
          className="container"
        >

          <Card>
            <CardContent>
              <Rating
                rating={overallRating}
              />
            </CardContent>
          </Card>

        </div>

      </div>
    )
  }
}

Publication.propTypes = {
  match: PropTypes.object
};

export default Publication;
