import React, { Component, PropTypes } from 'react';
import '../assets/stylesheets/Input.scss';
import '../assets/stylesheets/Pokemon.scss';
import Pokemon from '../assets/data/Pokemon.json';

// stackoverflow.com/questions/10834796/validate-that-a-string-is-a-positive-integer
function validateNumericEntry(number) {
  return number >>> 0 === parseFloat(number);
}

class Input extends Component {
  static propTypes = {
    onValidInputCB: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      found: false,
      pokemon: {},
      validCP: false,
      validHP: false,
      validDust: false,
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onCPChange = this.onCPChange.bind(this);
    this.onHPChange = this.onHPChange.bind(this);
    this.onDustChange = this.onDustChange.bind(this);
    this.checkValidInput = this.checkValidInput.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
  }

  onChange(e) {
    let pkmn = Pokemon.find((pokemon) =>
      (pokemon.name.toLowerCase() === e.target.value.toLowerCase()));
    const found = pkmn !== null && pkmn !== undefined;

    if (!found) {
      pkmn = {};
    }

    this.checkValidInput({ ...this.state,
      name: e.target.value, found, pokemon: pkmn });

    this.setState({
      name: e.target.value,
      found,
      pokemon: pkmn,
    });
  }

  onCPChange(e) {
    this.checkValidInput({ ...this.state,
      CP: e.target.value, validCP: validateNumericEntry(e.target.value) });

    this.setState({
      CP: e.target.value,
      validCP: validateNumericEntry(e.target.value),
    });
  }

  onHPChange(e) {
    this.checkValidInput({ ...this.state,
      HP: e.target.value, validHP: validateNumericEntry(e.target.value) });

    this.setState({
      HP: e.target.value,
      validHP: validateNumericEntry(e.target.value),
    });
  }

  onDustChange(e) {
    this.checkValidInput({ ...this.state,
      dust: e.target.value, validDust: validateNumericEntry(e.target.value) });

    this.setState({
      dust: e.target.value,
      validDust: validateNumericEntry(e.target.value),
    });
  }

  checkValidInput(newState) {
    const { found, validCP, validHP,
      validDust, pokemon, CP, HP, dust } = newState;
    const { onValidInputCB } = this.props;

    if (found && validCP && validHP && validDust) {
      onValidInputCB(pokemon, Number(CP), Number(HP), Number(dust));
    }
  }

  render() {
    let classes = this.state.found ? 'is-success' : 'is-danger';
    classes = `${classes} form-input input-lg`;

    let cpclasses = this.state.validCP ? 'is-success' : 'is-danger';
    cpclasses = `${cpclasses} form-input input-lg`;

    let hpclasses = this.state.validHP ? 'is-success' : 'is-danger';
    hpclasses = `${hpclasses} form-input input-lg`;

    let dustclasses = this.state.validDust ? 'is-success' : 'is-danger';
    dustclasses = `${dustclasses} form-input input-lg`;

    return (
      <div className="input-section">
        <div className="columns">
          <div className="column col-3" />
          <div className="column col-6">
            <form onSubmit={this.onSubmit}>
                <div className="input-group">
                  <span className="input-group-addon addon-lg">Name</span>
                  <input onChange={this.onChange} className={classes}></input>
                </div>
                <div className="columns">
                  <div className="input-group column col-4">
                    <span className="input-group-addon addon-lg">CP</span>
                    <input onChange={this.onCPChange} className={cpclasses}></input>
                  </div>
                  <div className="input-group column col-4">
                    <span className="input-group-addon addon-lg">HP</span>
                    <input onChange={this.onHPChange} className={hpclasses}></input>
                  </div>
                  <div className="input-group column col-4">
                    <span className="input-group-addon addon-lg">Dust</span>
                    <input onChange={this.onDustChange} className={dustclasses}></input>
                  </div>
                </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Input;
