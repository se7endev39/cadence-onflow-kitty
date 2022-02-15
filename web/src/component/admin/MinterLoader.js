import React from "react";
import {useCallback, useEffect, useRef, useState} from "react"
import PropTypes from "prop-types"

export const ITEM_KIND_MAP = {
  0: "Fishbowl",
  1: "Fish Hat",
  2: "Milkshake",
  3: "TukTuk",
  4: "Skateboard",
  5: "Shades",
}
export function parameterize(str) {
  return str.trim().toLowerCase().replace(" ", "-")
}

export function itemGradientClass(rarity) {
  switch (String(rarity)) {
    case "0":
      return "item-gradient-0"
    case "1":
      return "item-gradient-1"
    case "2":
      return "item-gradient-2"
    case "3":
      return "item-gradient-3"
    case "gray":
      return "item-gradient-gray"
    default:
      throw new Error()
  }
}

const ITEM_TYPE_COUNT = Object.keys(ITEM_KIND_MAP).length

export default function MinterLoader({ isLoading }) {
  return (
    <>
      {!isLoading && <MinterLoaderPlaceholderImage />}
      <MinterLoaderRandomImages isLoading={isLoading} />
    </>
  ) 
}

MinterLoader.propTypes = {
  isLoading: PropTypes.bool.isRequired
}

function MinterLoaderRandomImages({ isLoading }) {
  const loadingIntervalRef = useRef()

  const getRandId = () => Math.floor(Math.random() * ITEM_TYPE_COUNT)

  const [loadingKind, setLoadingKind] = useState(1)

  const updateLoadingImage = useCallback(() => {
    setLoadingKind(prev => {
      let newKind = getRandId()

      while (newKind === prev) {
        newKind = getRandId()
      }

      return newKind
    })
  }, [])

  useEffect(() => {
    if (isLoading) {
      loadingIntervalRef.current = setInterval(updateLoadingImage, 350)
    } else if (loadingIntervalRef.current) {
      clearInterval(loadingIntervalRef.current)
    }

    return () => {
      if (loadingIntervalRef.current) clearInterval(loadingIntervalRef.current)
    }
  }, [isLoading, updateLoadingImage])

  const kinds = Array(ITEM_TYPE_COUNT).fill(0).map((_, index) => index)

  return (
    <>
      {
        kinds.map((kind, index) => (
          <MinterLoaderImage
            key={index} 
            index={index}
            kind={kind}
            isHidden={!isLoading || kind !== loadingKind} />
        ))
      }
    </>
  )
}

function MinterLoaderPlaceholderImage() {
  const imageSrc1X = "/images/Dibbs-items/question-gray-lg.png"
  const imageSrc2X = "/images/Dibbs-items/question-gray-lg@2x.png"
  const imageSrcSet = `${imageSrc1X}, ${imageSrc2X} 2x`

  return (
    <div
      className={
        `group relative ${itemGradientClass("gray")} rounded-3xl relative flex w-full items-center justify-center`
      }>
      <img src={imageSrc1X} srcSet={imageSrcSet} alt="Mint a Dibbs Item" />
    </div>
  )
}

function getImageSrc(kind, is2X) {
  const kindName = ITEM_KIND_MAP[kind]
  return `/images/Dibbs-items/${parameterize(kindName)}-blue-lg${is2X ? "@2x" : ""}.png`
}

function MinterLoaderImage({ kind, isHidden }) {
  const imageSrc1X = getImageSrc(kind, false)
  const imageSrc2X = getImageSrc(kind, true)
  const imageSrcSet = `${imageSrc1X}, ${imageSrc2X} 2x`

  const classes = `group relative ${itemGradientClass(0)} ${isHidden ? "hidden" : ""} rounded-3xl relative flex w-full items-center justify-center`

  return (
    <div className={classes}>
      <img src={imageSrc1X} srcSet={imageSrcSet} alt="Mint a Dibbs Item" />
    </div>
  )
}
