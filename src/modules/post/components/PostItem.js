import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import moment from "moment";
import { withStyles } from "material-ui/styles";
import Card, { CardHeader, CardContent, CardActions } from "material-ui/Card";
import Avatar from "material-ui/Avatar";
import Button from "material-ui/Button";
import Typography from "material-ui/Typography";
import FileUpload from "material-ui-icons/FileUpload";
import FileDownload from "material-ui-icons/FileDownload";

const styles = theme => ({
  card: {
    display: "flex",
    flexDirection: "row",
    margin: 20
  },
  title: {
    color: "black",
    textDecoration: "none",
    fontSize: 20
  },
  vote: {
    display: "flex",
    flexDirection: "column",
    width: 100,
    padding: 20
  },
  details: {
    display: "flex",
    flexDirection: "column",
    width: "100%"
  },
  actions: {
    display: "flex"
  },
  avatar: {
    backgroundColor: "#AC0000"
  }
});

const PostItem = ({
  id,
  title,
  body,
  category,
  author,
  timestamp,
  voteScore,
  handleVote,
  handleRemove,
  classes,
  commentsCount
}) => {
  let initials = author.match(/\b\w/g) || [];
  initials = ((initials.shift() || "") + (initials.pop() || "")).toUpperCase();
  return (
    <Card className={classes.card} elevation={1}>
      <div className={classes.vote}>
        <Button
          className={classes.button}
          onClick={(event, value) => handleVote(event, "upVote", id)}
          variant="raised"
          color="primary"
        >
          <FileUpload />
        </Button>

        <Button
          className={classes.button}
          variant="raised"
          color="default"
          disabled
        >
          {voteScore}
        </Button>
        <Button
          className={classes.button}
          onClick={(event, value) => handleVote(event, "downVote", id)}
          variant="raised"
          color="primary"
        >
          <FileDownload />
        </Button>
      </div>
      <div className={classes.details}>
        <CardHeader
          avatar={
            <Avatar aria-label="Recipe" className={classes.avatar}>
              {initials}
            </Avatar>
          }
          action={
            <div>
              <Button
                color="inherit"
                to={`/update/${id}`}
                component={props => <Link {...props} />}
              >
                Edit
              </Button>
              <Button color="inherit" onClick={() => handleRemove(id)}>
                Remove
              </Button>
            </div>
          }
          title={
            <Link to={`/${category}/${id}`} className={classes.title}>
              {title}
            </Link>
          }
          subheader={`Since ${moment().diff(
            timestamp,
            "hours"
          )} hours by ${author} in /${category}`}
        />
        <CardContent>
          <Typography component="p">{body}</Typography>
        </CardContent>
        <CardActions className={classes.actions}>
          <Button
            size="small"
            color="primary"
            to={`/${category}/${id}`}
            component={props => <Link {...props} />}
          >
            {commentsCount} comment(s)
          </Button>
        </CardActions>
      </div>
    </Card>
  );
};

PostItem.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PostItem);
