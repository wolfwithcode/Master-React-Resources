import React, { Fragment } from 'react'
import { Drawer, PopoverArrow, PopoverContent } from './popover.style'

export default function Popover({ active, children }) {
  return (
    <Fragment>
      {active && (
        <Drawer>
          <PopoverArrow />
          <PopoverContent>{children}</PopoverContent>
        </Drawer>
      )}
    </Fragment>
  )
}
