import React, { useEffect, useState } from 'react'
import FilterPanel from 'components/FilterPanel/FilterPanel'
import SearchItemResult from 'components/SearchItemResult/SearchItemResult'
import { Container, Main, Side } from './home.style'
import categoryApi from 'api/category.api'
import productApi from 'api/product.api'
import useQuery from 'hooks/useQuery'

export default function Home() {
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState({})
  const [filters, setFilters] = useState({})
  const query = useQuery()
  useEffect(() => {
    categoryApi.getCategories().then(res => {
      setCategories(res.data)
    })
  }, [])
  useEffect(() => {
    const _filters = {
      ...query,
      page: query.page || 1,
      limit: query.limit || 30,
      sortBy: query.sortBy || 'view'
    }
    setFilters(_filters)
    const params = {
      page: _filters.page,
      limit: _filters.limit,
      category: _filters.category,
      exclude: _filters.exclude,
      sort_by: _filters.sortBy,
      order: _filters.order,
      rating_filter: _filters.rating,
      price_max: _filters.maxPrice,
      price_min: _filters.minPrice,
      name: _filters.name
    }
    productApi.getProducts({ params }).then(res => {
      setProducts(res.data)
    })
  }, [query])

  return (
    <div>
      <Container className="container">
        <Side>
          <FilterPanel categories={categories} filters={filters} />
        </Side>
        <Main>
          <SearchItemResult products={products} filters={filters} />
        </Main>
      </Container>
    </div>
  )
}
