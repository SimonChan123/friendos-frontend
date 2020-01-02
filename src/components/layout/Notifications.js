import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';

// Redux imports
import { connect } from 'react-redux';
import { markNotificationsRead } from '../../redux/actions/userActions';

// Material UI icons
import NotificationIcon from '@material-ui/icons/Notifications';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatIcon from '@material-ui/icons/Chat';

// Material UI imports
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';

class Notifications extends Component {
    state = {
        anchorEl: null
    };

    handleOpen = (event) => {
        this.setState({ anchorEl: event.target });
    }

    handleClose = () => {
        this.setState({ anchorEl: null });
    }

    onMenuOpened = () => {
        let unreadID = this.props.notifications
            .filter(notification => !notification.read)
            .map(notification => notification.notificationsId);
        this.props.markNotificationsRead(unreadID);
    }

    render() {
        const notifications = this.props.notifications;
        const anchorEl = this.state.anchorEl;

        dayjs.extend(relativeTime);

        let notificationIcon;

        if (notifications && notifications.length > 0) {
            notifications.filter(notification => notification.read === false).length > 0 ? (
                notificationIcon = (
                    <Badge 
                        badgeContent={notifications.filter(notification => notification.read === false).length}
                        color="secondary"
                    >
                        <NotificationIcon />
                    </Badge>
                )
            ) : (
                notificationIcon = <NotificationIcon />
            )
        } else {
            notificationIcon = <NotificationIcon />
        }

        let notificationsMarkup = notifications && notifications.length > 0 ? (
            notifications.map(notification => {
                const verb = notification.type === 'like' ? 'liked' : 'commented on';
                const time = dayjs(notification.createdAt).fromNow();
                const iconColor = notification.read ? 'primary' : 'secondary'; 
                const icon = notification.type === 'like' ? (
                    <FavoriteIcon color={iconColor} style={ { marginRight: 10 } } />
                ) : (
                    <ChatIcon color={iconColor} style={ { marginRight: 10 } } />
                );

                return (
                    <MenuItem key={notification.createdAt} onClick={this.handleClose}>
                        {icon}
                        <Typography 
                            component={Link} 
                            variant="body1" 
                            to={`/users/${notification.recipient}/post/${notification.postID}`}
                        >
                            {notification.sender} {verb} your post {time}
                        </Typography>
                    </MenuItem>
                )
            })
        ) : (
            <MenuItem onClick={this.handleClose}>
                No new notifications.
            </MenuItem>
        )

        return (
            <Fragment>
                <Tooltip placement="top" title="Notifications">
                    <IconButton 
                        aria-owns={anchorEl ? 'simple-menu' : undefined}
                        aria-haspopup="true"
                        onClick={this.handleOpen}
                    >
                        {notificationIcon}    
                    </IconButton>
                </Tooltip>
                <Menu 
                    anchorEl={anchorEl} 
                    open={Boolean(anchorEl)} 
                    onClose={this.handleClose}
                    onEntered={this.onMenuOpened}
                >
                    {notificationsMarkup}
                </Menu>
            </Fragment>
        );
    }
}

Notifications.protoTypes = {
    markNotificationsRead: PropTypes.func.isRequired,
    notifications: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    notifications: state.user.notifications
});

const mapActionsToProps = { markNotificationsRead };

export default connect(mapStateToProps, mapActionsToProps)(Notifications);

