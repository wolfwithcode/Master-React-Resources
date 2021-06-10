import React from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import {
  CategoryTitle,
  CategoryList,
  CategoryItem,
  FilterGroup,
  FilterGroupHeader,
  PriceRange,
  PriceRangeGroup,
  PriceRangeInput,
  PriceRangeLine,
  PriceRangeButton,
  RatingStarsContainer,
  RemoveFilterButton,
  CategoryTitleLink,
  PriceErrorMessage
} from './filterPanel.style'
import { path } from 'constants/path'
import { useForm, Controller } from 'react-hook-form'
import PropTypes from 'prop-types'
import qs from 'query-string'
import useQuery from 'hooks/useQuery'
function RatingStars({ filters }) {
  const history = useHistory()
  const searchRating = rating => {
    const _filters = {
      ...filters,
      rating
    }
    history.push(path.home + `?${qs.stringify(_filters)}`)
  }

  return (
    <div>
      {Array(5)
        .fill(0)
        .map((item, index) => (
          <RatingStarsContainer
            key={index}
            onClick={() => searchRating(5 - index)}
          >
            {Array(5)
              .fill(0)
              .map((start, indexStar) => {
                if (indexStar < 5 - index) {
                  return (
                    <svg
                      viewBox="0 0 9.5 8"
                      className="shopee-svg-icon rating-stars__star icon-rating-colored"
                      key={indexStar}
                    >
                      <defs>
                        <linearGradient
                          id="ratingStarGradient"
                          x1="50%"
                          x2="50%"
                          y1="0%"
                          y2="100%"
                        >
                          <stop offset={0} stopColor="#ffca11" />
                          <stop offset={1} stopColor="#ffad27" />
                        </linearGradient>
                        <polygon
                          id="ratingStar"
                          points="14.910357 6.35294118 12.4209136 7.66171903 12.896355 4.88968305 10.8823529 2.92651626 13.6656353 2.52208166 14.910357 0 16.1550787 2.52208166 18.9383611 2.92651626 16.924359 4.88968305 17.3998004 7.66171903"
                        />
                      </defs>
                      <g
                        fill="url(#ratingStarGradient)"
                        fillRule="evenodd"
                        stroke="none"
                        strokeWidth={1}
                      >
                        <g transform="translate(-876 -1270)">
                          <g transform="translate(155 992)">
                            <g transform="translate(600 29)">
                              <g transform="translate(10 239)">
                                <g transform="translate(101 10)">
                                  <use
                                    stroke="#ffa727"
                                    strokeWidth=".5"
                                    xlinkHref="#ratingStar"
                                  />
                                </g>
                              </g>
                            </g>
                          </g>
                        </g>
                      </g>
                    </svg>
                  )
                }
                return (
                  <svg viewBox="0 0 30 30" className="_3c6iA8" key={indexStar}>
                    <defs>
                      <linearGradient
                        id="star__hollow"
                        x1="50%"
                        x2="50%"
                        y1="0%"
                        y2="99.0177926%"
                      >
                        <stop offset="0%" stopColor="#FFD211" />
                        <stop offset="100%" stopColor="#FFAD27" />
                      </linearGradient>
                    </defs>
                    <path
                      fill="none"
                      fillRule="evenodd"
                      stroke="url(#star__hollow)"
                      strokeWidth={2}
                      d="M23.226809 28.390899l-1.543364-9.5505903 6.600997-6.8291523-9.116272-1.4059447-4.01304-8.63019038-4.013041 8.63019038-9.116271 1.4059447 6.600997 6.8291523-1.543364 9.5505903 8.071679-4.5038874 8.071679 4.5038874z"
                    />
                  </svg>
                )
              })}
            {index !== 0 && <span>Trở lên</span>}
          </RatingStarsContainer>
        ))}
    </div>
  )
}

RatingStars.propTypes = {
  filters: PropTypes.object
}

export default function FilterPanel({ categories, filters }) {
  const history = useHistory()
  const query = useQuery()
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
    clearErrors,
    reset
  } = useForm({
    defaultValues: {
      minPrice: query.minPrice || '',
      maxPrice: query.maxPrice || ''
    },
    reValidateMode: 'onSubmit'
  })

  const searchPrice = data => {
    const { minPrice, maxPrice } = data
    if (minPrice !== '' || maxPrice !== '') {
      let _filters = filters
      if (minPrice !== '') {
        _filters = { ...filters, minPrice }
      }
      if (maxPrice !== '') {
        _filters = { ...filters, maxPrice }
      }
      history.push(path.home + `?${qs.stringify(_filters)}`)
    }
  }

  const clearAll = () => {
    reset()
    history.push({
      pathname: path.home,
      search: query.name ? `?name=${query.name}` : ''
    })
  }

  return (
    <div>
      <CategoryTitleLink to={path.home}>
        <svg
          viewBox="0 0 12 10"
          className="shopee-svg-icon shopee-category-list__header-icon icon-all-cate"
        >
          <g fillRule="evenodd" stroke="none" strokeWidth={1}>
            <g transform="translate(-373 -208)">
              <g transform="translate(155 191)">
                <g transform="translate(218 17)">
                  <path d="m0 2h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z" />
                  <path d="m0 6h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z" />
                  <path d="m0 10h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z" />
                </g>
              </g>
            </g>
          </g>
        </svg>
        Tất cả danh mục
      </CategoryTitleLink>
      <CategoryList>
        {categories.map(category => (
          <CategoryItem key={category._id}>
            <NavLink
              to={path.home + `?category=${category._id}`}
              isActive={(match, location) => {
                if (!match) {
                  return false
                }
                const query = qs.parse(location.search)
                return query.category === category._id
              }}
            >
              {category.name}
            </NavLink>
          </CategoryItem>
        ))}
      </CategoryList>
      <CategoryTitle>
        <svg
          enableBackground="new 0 0 15 15"
          viewBox="0 0 15 15"
          x={0}
          y={0}
          className="shopee-svg-icon "
        >
          <g>
            <polyline
              fill="none"
              points="5.5 13.2 5.5 5.8 1.5 1.2 13.5 1.2 9.5 5.8 9.5 10.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeMiterlimit={10}
            />
          </g>
        </svg>
        Bộ lọc tìm kiếm
      </CategoryTitle>
      <FilterGroup>
        <FilterGroupHeader>Khoản giá</FilterGroupHeader>
        <PriceRange>
          <PriceRangeGroup>
            <Controller
              name="minPrice"
              control={control}
              rules={{
                validate: {
                  atLeast: () =>
                    getValues('maxPrice') !== '' || getValues('minPrice') !== ''
                }
              }}
              render={({ field }) => (
                <PriceRangeInput
                  placeholder="Từ"
                  onChange={value => {
                    clearErrors()
                    return field.onChange(value)
                  }}
                  value={getValues('minPrice')}
                />
              )}
            />
            <PriceRangeLine></PriceRangeLine>
            <Controller
              name="maxPrice"
              control={control}
              rules={{
                validate: {
                  atLeast: () =>
                    getValues('maxPrice') !== '' || getValues('minPrice') !== ''
                }
              }}
              render={({ field }) => (
                <PriceRangeInput
                  placeholder="Đến"
                  onChange={value => {
                    clearErrors()
                    return field.onChange(value)
                  }}
                  value={getValues('maxPrice')}
                />
              )}
            />
          </PriceRangeGroup>
          {Object.values(errors).length !== 0 && (
            <PriceErrorMessage>
              Vui lòng điền khoảng giá phù hợp
            </PriceErrorMessage>
          )}
          <PriceRangeButton onClick={handleSubmit(searchPrice)}>
            Áp dụng
          </PriceRangeButton>
        </PriceRange>
      </FilterGroup>
      <FilterGroup>
        <FilterGroupHeader>Đánh giá</FilterGroupHeader>
        <RatingStars filters={filters} />
      </FilterGroup>
      <RemoveFilterButton onClick={clearAll}>Xóa tất cả</RemoveFilterButton>
    </div>
  )
}

FilterPanel.propTypes = {
  categories: PropTypes.array,
  filters: PropTypes.object
}
