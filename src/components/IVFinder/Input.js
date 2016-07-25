import React, { Component, PropTypes } from 'react';
import '~/assets/stylesheets/IVFinder/Input.scss';
import '~/assets/stylesheets/utility.scss';
import Pokemon from '~/assets/data/Pokemon.json';
import Dust from '~/assets/data/Dust.json';

// stackoverflow.com/questions/10834796/validate-that-a-string-is-a-positive-integer
function validateNumericEntry(number) {
  return number >>> 0 === parseFloat(number) && number > 0;
}

function validateLevelEntry(number) {
  return validateNumericEntry(number) && number <= 40;
}

function validateDustEntry(number) {
  if (number === '') {
    return false;
  }

  const dustData = Dust.find((dust) =>
    (dust.cost === Number(number)));
  return dustData !== null && dustData !== undefined;
}

function validatePokemonEntry(entry) {
  if (entry === '') {
    return false;
  }

  const pkmn = Pokemon.find((pokemon) =>
    (pokemon.name.toLowerCase().trim() === entry.toLowerCase().trim()));
  return pkmn !== null && pkmn !== undefined;
}

function getValidityIcon(success) {
  if (success) {
    return <i className="fa fa-check" aria-hidden="true"></i>;
  }

  return <i className="fa fa-times" aria-hidden="true"></i>;
}

class Input extends Component {
  static propTypes = {
    onInputSubmitCB: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      trainerLevel: '',
      name: '',
      cp: '',
      hp: '',
      dust: '',
      isNewSearch: true,
      wild: true,
    };
    this.onNewSearchSubmit = this.onNewSearchSubmit.bind(this);
    this.onFilterSubmit = this.onFilterSubmit.bind(this);
    this.onReset = this.onReset.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
    this.onCPChange = this.onCPChange.bind(this);
    this.onHPChange = this.onHPChange.bind(this);
    this.onDustChange = this.onDustChange.bind(this);
    this.onWildChange = this.onWildChange.bind(this);
    this.onTrainerChange = this.onTrainerChange.bind(this);
  }

  onReset() {
    this.setState({
      name: '',
      cp: '',
      hp: '',
      dust: '',
      wild: true,
    });
  }

  onNewSearchSubmit() {
    const { trainerLevel, name, cp, hp, dust, wild } = this.state;
    const validTrainerLevel = validateLevelEntry(trainerLevel);
    const validPokemon = validatePokemonEntry(name);
    const validCP = validateNumericEntry(cp);
    const validHP = validateNumericEntry(hp);
    const validDust = validateDustEntry(dust);

    if (validPokemon && validCP && validDust && validHP && validTrainerLevel) {
      this.props.onInputSubmitCB(trainerLevel, name, Number(cp), Number(hp),
        Number(dust), wild, true);

      this.setState({
        isNewSearch: false,
      });
    }
  }

  onFilterSubmit() {
    const { trainerLevel, name, cp, hp, dust } = this.state;
    const validTrainerLevel = validateLevelEntry(trainerLevel);
    const validPokemon = validatePokemonEntry(name);
    const validCP = validateNumericEntry(cp);
    const validHP = validateNumericEntry(hp);
    const validDust = validateDustEntry(dust);

    if (validPokemon && validCP && validDust && validHP && validTrainerLevel) {
      this.props.onInputSubmitCB(trainerLevel, name, Number(cp), Number(hp),
        Number(dust), false, false);
    }
  }

  onNameChange(e) {
    this.setState({
      name: e.target.value,
    });
  }

  onCPChange(e) {
    this.setState({
      cp: e.target.value,
    });
  }

  onHPChange(e) {
    this.setState({
      hp: e.target.value,
    });
  }

  onDustChange(e) {
    this.setState({
      dust: e.target.value,
    });
  }

  onWildChange(e) {
    this.setState({
      wild: e.target.checked,
    });
  }

  onTrainerChange(e) {
    this.setState({
      trainerLevel: e.target.value,
    });
  }

  render() {
    const { trainerLevel, name, cp, hp, dust, isNewSearch } = this.state;

    const validTrainerLevel = validateLevelEntry(trainerLevel);
    const validPokemon = validatePokemonEntry(name);
    const validCP = validateNumericEntry(cp);
    const validHP = validateNumericEntry(hp);
    const validDust = validateDustEntry(dust);

    const trainerStatus = getValidityIcon(validTrainerLevel);
    const nameStatus = getValidityIcon(validPokemon);
    const cpStatus = getValidityIcon(validCP);
    const hpStatus = getValidityIcon(validHP);
    const dustStatus = getValidityIcon(validDust);

    const filterButton = !isNewSearch ? (
      <button className="btn btn-primary btn-lrg button-item" onClick={this.onFilterSubmit}>
        search same
      </button>
    ) : '';

    return (
      <div className="section">
        <div className="input-group">
          <span className="input-group-addon addon-lg left-addon">trainer lv</span>
          <input onChange={this.onTrainerChange} className="form-input input-lg"
            value={trainerLevel}></input>
          <span className="input-group-addon addon-lg right-addon">{trainerStatus}</span>
        </div>
        <div className="input-group">
          <span className="input-group-addon addon-lg left-addon">name</span>
          <input onChange={this.onNameChange} className="form-input input-lg"
            value={name}></input>
          <span className="input-group-addon addon-lg right-addon">{nameStatus}</span>
        </div>
        <div className="input-group">
          <span className="input-group-addon addon-lg left-addon">cp</span>
          <input onChange={this.onCPChange} className="form-input input-lg"
            value={cp}></input>
          <span className="input-group-addon addon-lg right-addon">{cpStatus}</span>
        </div>
        <div className="input-group">
          <span className="input-group-addon addon-lg left-addon">hp</span>
          <input onChange={this.onHPChange} className="form-input input-lg"
            value={hp}></input>
          <span className="input-group-addon addon-lg right-addon">{hpStatus}</span>
        </div>
        <div className="input-group">
          <span className="input-group-addon addon-lg left-addon">dust</span>
          <input onChange={this.onDustChange} className="form-input input-lg"
            value={dust}></input>
          <span className="input-group-addon addon-lg right-addon">{dustStatus}</span>
        </div>
        <div className="new-section">
          <div className="checkbox-item">
            <label className="form-checkbox">
              <input type="checkbox" onChange={this.onWildChange} checked={this.state.wild} />
              <i className="form-icon"></i>
              <span className="checkbox-text">untrained wild</span>
            </label>
          </div>
        </div>
        <div className="new-section">
          {filterButton}
          <button className="btn btn-primary btn-lrg button-item" onClick={this.onNewSearchSubmit}>
            search new
          </button>
          <button className="btn btn-primary btn-lrg button-item" onClick={this.onReset}>
            clear
          </button>
        </div>
      </div>
    );
  }
}

export default Input;