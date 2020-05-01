import React from 'react'
import Select, { components } from 'react-select'
import languageIcon from '../../assets/lang-icon.svg'
import '../../css/language.css'

const options = [
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Español' }
]

let optionsIndex = options.map(op => op.value)

const customStyles = {
  container: provided => ({
    ...provided,
    width: '100%'
  }),
  control: provided => ({
    ...provided,
    cursor: 'pointer',
    border: 0,
    boxShadow: 'none',
    padding: 12,
    borderRadius: 0,
    fontFamily: 'Montserrat',
    backgroundColor: '#FFF',
    '&:hover': {
      border: 'none',
      backgroundColor: '#f8f8f8'
    }
  }),
  option: (provided, state) => ({
    ...provided,
    padding: 21,
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: state.isSelected ? '#458CC8' : '#f8f8f8',
      color: state.isSelected ? '#FFF' : '#383838'
    }
  }),
  menuList: provided => ({
    ...provided,
    padding: 0,
    borderRadius: 0
  }),
  menu: provided => ({
    ...provided,
    borderRadius: 0,
    border: 'none',
  })
}

const DropdownIndicator = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      <img className="lang-icon" alt="Lang" src={languageIcon}/>
    </components.DropdownIndicator>
  )
}

export default ({ selectedLanguage, setSelectedLanguage }) => {
  const [ selectedOption, setSelectedOption ] = React.useState(optionsIndex.indexOf(selectedLanguage) > -1 ? options[optionsIndex.indexOf(selectedLanguage)] : options[0])
  const focus = true

  React.useEffect(() => {
    console.log("detected")
    setSelectedOption(options[optionsIndex.indexOf(selectedLanguage)] )
  }, [selectedLanguage])

  const handleOptionChange = (option) => {
    setSelectedOption(option)
    setSelectedLanguage(option.value)
  }

  const DropDown = () => (
    <Select
      value={[selectedOption]}
      onChange={handleOptionChange}
      options={options}
      styles={customStyles}
      isSearchable={false}
      components={{ DropdownIndicator }}
      theme={theme => ({
        ...theme,
        colors: {
          ...theme.colors,
          primary: '#458CC8',
          primary75: '#FFF',
          primary50: '#FFF',
          primary25: '#FFF'
        }
      })}
    />
  )

  return (
    <div className="dropdown-container lang-container">
      <div id="language-drop" className="mw-210">
        <React.Fragment>
          <DropDown/>
          <span className={`tvt-input-underline ${focus || selectedLanguage ? 'ulfocus' : 'ulnofocus'}`}></span>
        </React.Fragment>
      </div>
    </div>
  )
}