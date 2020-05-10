import React, {useContext, useState} from 'react'
import {useCombobox} from 'downshift'
import {TimezonesContext} from '../context'
import {ALL_TIMEZONES} from '../data'

export const TimezonesCombobox = () => {
  const {timezones, addTimezone} = useContext(TimezonesContext)
  const [inputItems, setInputItems] = useState(ALL_TIMEZONES)

  const stateReducer = (_, actionAndChanges) => {
    switch (actionAndChanges.type) {
      // on select
      case useCombobox.stateChangeTypes.ItemClick:
      case useCombobox.stateChangeTypes.InputKeyDownEnter:
        const {changes} = actionAndChanges
        const {selectedItem} = changes

        if (!selectedItem || changes?.highlightedIndex === -1)
          return {
            ...actionAndChanges.changes,
            inputValue: '',
          }

        addTimezone(selectedItem)

        return {
          ...actionAndChanges.changes,
          inputValue: '',
        }
      default:
        return actionAndChanges.changes
    }
  }

  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
  } = useCombobox({
    items: inputItems,
    stateReducer,
    onInputValueChange: ({inputValue}) => {
      setInputItems(
        ALL_TIMEZONES.filter(
          item =>
            !timezones.some(({value}) => value === item.value) &&
            item.name.toLowerCase().includes(inputValue.toLowerCase()),
        ),
      )
    },
    itemToString: ({name}) => name,
    defaultHighlightedIndex: 0,
  })

  return (
    <div className="combobox">
      <label {...getLabelProps()} className="sr-only">
        Select timezones
      </label>

      <div className="combobox__input-container" {...getComboboxProps()}>
        <input className="input combobox__input" {...getInputProps()} />
        <button
          className="button combobox__toggle"
          {...getToggleButtonProps()}
          aria-label="Toggle timezones list"
        >
          &#8595;
        </button>
      </div>

      <ul className="combobox__menu" {...getMenuProps()}>
        {isOpen &&
          inputItems.map((item, index) => (
            <li
              className="combobox__menu-item"
              data-active={highlightedIndex === index}
              key={`${item.name}${index}`}
              {...getItemProps({item, index})}
            >
              {item.name}
            </li>
          ))}
      </ul>
    </div>
  )
}
