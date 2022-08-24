/*
Understandable Passwords - make random, yet understandable sentences to use as passwords
Copyright 2022 Đặng Văn Quân

This file is part of Understandable Passwords.

Understandable Passwords is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or any later version.

Understandable Passwords is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License along with Understandable Passwords. If not, see <https://www.gnu.org/licenses/>.

Contact email: gizapp@tutanota.com
*/
'use strict';
const minTooltipWidth = 6*rem2px
const maxTooltipHeight = 10*rem2px
const maxDownMovement = rem2px
const tooltipOffset = -1
const tooltipFont = parseFloat(rootStyle.getPropertyValue('--tooltipFont'))*rem2px
function makeTooltipTrigger(elem, tooltipText, positionElem) {
  if (!positionElem) positionElem = elem
  elem.classList.add('tooltiptrigger')
  const tooltip = document.createElement('span')
  tooltip.className = 'tooltip'
  tooltip.innerText = tooltipText || ''
  elem.tooltip = tooltip
  elem.appendChild(tooltip)
  tooltip.updatePos = function() {
    const viewportWidth = document.documentElement.clientWidth
    const viewportHeight = document.documentElement.clientHeight
    let tooltipVisible = false
    if (parseFloat(getComputedStyle(tooltip).fontSize) > 1)
      tooltipVisible = true
    const parentRect = positionElem.getBoundingClientRect()
    let overflow = Math.max(parentRect.right + minTooltipWidth - viewportWidth, 0)
    const overflowY = parentRect.bottom + maxTooltipHeight > viewportHeight
    let anchorLeft = false
    if (overflow > 0) {
      var niceOverflow = parentRect.width + tooltipOffset
      if (niceOverflow > overflow) {
        overflow = niceOverflow
        anchorLeft = true
      }
    }
    for (const tooltip of elem.querySelectorAll(':scope > .tooltip')) /*scope*/ {
      let rect = tooltip.getBoundingClientRect()
      const diff = rect.x - parentRect.right - tooltipOffset
      const left = (parseFloat(tooltip.style.marginLeft) || 0)
      let top = (parseFloat(tooltip.style.marginTop) || 0)
      tooltip.style.marginLeft = `${left - overflow - diff}px`
      tooltip.style.right = null
      tooltip.style.maxWidth = null
      if (overflow > 0) {
        if (niceOverflow < overflow) {
          tooltip.style.right = `${viewportWidth - parentRect.x + tooltipOffset}px`
          tooltip.style.maxWidth = `${minTooltipWidth}px`
          tooltip.style.marginLeft = null
          top -= rect.y - parentRect.y
        } else
          top -= rect.y - parentRect.bottom - tooltipOffset
      } else {
        top -= rect.y - parentRect.y
      }
      if (overflowY) {
        tooltip.style.marginTop = null
        tooltip.style.bottom = `${viewportHeight - (anchorLeft ? parentRect.top : parentRect.bottom) + tooltipOffset}px`
      } else {
        tooltip.style.marginTop = `${top}px`
        tooltip.style.bottom = null
      }
    }
    // scope: use :scope to get direct child only and avoid disturbing children's tooltips
    // tooltipVisible: if tooltip is not visible, reset the tooltip animations after updating
  }
  elem.triggerTooltip = function(timeout = 2500) {
    this.classList.toggle('triggered', true)
    setTimeout(tooltip.updatePos, 1)
    document.documentElement.classList.add('tooltipForceTriggered')
    setTimeout(() => {
      elem.classList.toggle('triggered', false)
      document.documentElement.classList.remove('tooltipForceTriggered')
    }, timeout)
  }
  elem.addEventListener('mouseenter', tooltip.updatePos)
  elem.addEventListener('touchstart', tooltip.updatePos)
  elem.addEventListener('touchend', tooltip.updatePos)
  elem.addEventListener('transitionend', tooltip.updatePos)
  setTimeout(() => {
    for (let parent = elem.parentNode; parent && parent.nodeType === Node.ELEMENT_NODE; parent = parent.parentNode) {
      const style = getComputedStyle(parent)
      if (style.overflowY == 'scroll' || style.overflowY == 'auto') {
        parent.addEventListener('scroll', function() {
          const style = getComputedStyle(tooltip)
          if (parseFloat(style.fontSize) > 1)
            tooltip.updatePos()
        })
      }
    }
  }, 1)
  return tooltip
}
