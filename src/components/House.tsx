import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';

import { ActionType } from '../actions';
import { Color, State } from '../types';
import './House.css';
import { getNumberOfMarblesOnboard } from '../selectors';


type OwnProps = {
    color: Color;
}

type StateProps = {
    numMarbles: number,
    isPickedUp: boolean,
}

type DispatchProps = {
    onHouseClick: () => {}
}

type Props = OwnProps & StateProps & DispatchProps;


function House(props: Props) {
    return (
        <div onClick={props.onHouseClick} className={classnames("house", `house--${props.color.toString()}`, props.isPickedUp ? 'house--picked-up' : null)}>
            <div className="house__marble-container">
                {Array.from(Array(props.numMarbles).keys()).map(index => <div className={classnames("house__marble")} key={index} />)}
            </div>
        </div>
    );
}

function mapStateToProps(state: State, { color }: OwnProps): StateProps {
    return {
        numMarbles: 4 - getNumberOfMarblesOnboard(state, color),
        isPickedUp: state.pickedUpMarble?.field === null && state.pickedUpMarble?.color === color
    }
}

const mapDispatchToProps = (dispatch: any, { color }: OwnProps): DispatchProps => {
    return {
        onHouseClick: () => dispatch({ type: ActionType.HOUSE_CLICKED, payload: { color } }),
    }
}

export default connect<StateProps, DispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps)(House);
