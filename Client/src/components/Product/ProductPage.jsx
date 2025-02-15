'use client'

import { useEffect, useState } from 'react'
import {
  Dialog,
  DialogBackdrop, 
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import {  FunnelIcon, MinusIcon, PlusIcon } from '@heroicons/react/20/solid'
import ProductList from './ProductList'
import {useParams, useSearchParams} from 'react-router-dom'
import {getProducts} from '../../connectors/services.js'

const filters = [
  {
    id: 'color',
    name: 'Color',
    options: [
      { value: 'White', label: 'White', checked: false },
      { value: 'Black', label: 'Black', checked: false },
      { value: 'Grey', label: 'Grey', checked: false },
      { value: 'Blue', label: 'Blue', checked: true },
      { value: 'Brown', label: 'Brown', checked: false },
      { value: 'Green', label: 'Green', checked: false },
    ],
  },
  {
    id: 'size',
    name: 'Size',
    options: [
      { value: 'S', label: 'S', checked: false },
      { value: 'M', label: 'M', checked: false },
      { value: 'L', label: 'L', checked: false },
      { value: 'XL', label: 'XL', checked: false },
      { value: 'XXL', label: 'XXL', checked: false },
      { value: 'XXXL', label: 'XXXL', checked: true },
    ],
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ProductPage() {
 

  const [searchParams,setSearchParams] = useSearchParams()
  const [formData,setFormData] = useState({
    Color :  searchParams.get('color')?.split(',') || ["Blue"],
    Size : searchParams.get('size')?.split(',') || [],
    // priceRange : searchParams.get('priceRange')
  })

  useEffect(() => {
    const params = {};
    if(formData.Color.length > 0) params.color = formData.Color.join(",")
    if(formData.Size.length > 0) params.size = formData.Size.join(",")
      setSearchParams(params)
  },[formData,setSearchParams])
  

  const handleChange = (e) => {
    const {name,checked} = e.target
    const parent = e.target.getAttribute('parent');
    setFormData((prev) => {
      let updatedArray = checked ? [...prev[parent],name] : prev[parent].filter((item) => item !== name)
      return {...prev,[parent] : updatedArray}
    })

  }

  
  const {firstCategory,secondCategory} = useParams()
  const [products,setProducts] = useState([])
  const [pageNo,setPageNo] = useState(1)
  const [totalPages,setTotalPages] = useState(0)


  useEffect(() => {
    async function fetchProducts() {
      const data = {
        color: formData.Color.join(',') || "Nitesh",
        size: formData.Size.join(','),
        page: pageNo ,
      };
      const response = await getProducts(firstCategory, secondCategory, data);
      if (response) {
        setProducts(response?.docs);
        setTotalPages(response?.totalPages || 0);
      }
    }
    fetchProducts();
  }, [pageNo, formData,searchParams]);

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  return (
    <div className="bg-wBlacke z-1">
      <div>
        {/* Mobile filter dialog */}
        <Dialog open={mobileFiltersOpen} onClose={setMobileFiltersOpen} className="relative z-40 lg:hidden">
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
          />

          <div className="fixed inset-0 z-40 flex">
            <DialogPanel
              transition
              className="relative ml-auto flex size-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full"
            >
              <div className="flex items-center justify-between px-4">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(false)}
                  className="-mr-2 flex size-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon aria-hidden="true" className="size-6" />
                </button>
              </div>

              {/* Filters */}
              <form className="mt-4 border-t border-gray-200">
               

                {filters.map((section) => (
                  <Disclosure key={section.id} as="div" className="border-t border-gray-200 px-4 py-6">
                    <h3 className="-mx-2 -my-3 flow-root">
                      <DisclosureButton className="group flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                        <span className="font-medium text-gray-900">{section.name}</span>
                        <span className="ml-6 flex items-center">
                          <PlusIcon aria-hidden="true" className="size-5 group-data-[open]:hidden" />
                          <MinusIcon aria-hidden="true" className="size-5 group-[&:not([data-open])]:hidden" />
                        </span>
                      </DisclosureButton>
                    </h3>
                    <DisclosurePanel className="pt-6">
                      <div className="space-y-6">
                        {section.options.map((option, optionIdx) => (
                          <div key={option.value} className="flex gap-3">
                            <div className="flex h-5 shrink-0 items-center">
                              <div className="group grid size-4 grid-cols-1">
                                <input
                                  defaultValue={option.value}
                                  id={`filter-mobile-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  type="checkbox"
                                  className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                                />
                                <svg
                                  fill="none"
                                  viewBox="0 0 14 14"
                                  className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25"
                                >
                                  <path
                                    d="M3 8L6 11L11 3.5"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="opacity-0 group-has-[:checked]:opacity-100"
                                  />
                                  <path
                                    d="M3 7H11"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="opacity-0 group-has-[:indeterminate]:opacity-100"
                                  />
                                </svg>
                              </div>
                            </div>
                            <label
                              htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                              className="min-w-0 flex-1 text-gray-500"
                            >
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </DisclosurePanel>
                  </Disclosure>
                ))}
              </form>
            </DialogPanel>
          </div>
        </Dialog>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">New Arrivals</h1>

            <div className="flex items-center">
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(true)}
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon aria-hidden="true" className="size-5" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <form className="hidden lg:block">
                

                {filters.map((section) => (
                  <Disclosure key={section.id} as="div" className="border-b border-gray-200 py-6">
                    <h3 className="-my-3 flow-root">
                      <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                        <span className="font-medium text-gray-900">{section.name}</span>
                        <span className="ml-6 flex items-center">
                          <PlusIcon aria-hidden="true" className="size-5 group-data-[open]:hidden" />
                          <MinusIcon aria-hidden="true" className="size-5 group-[&:not([data-open])]:hidden" />
                        </span>
                      </DisclosureButton>
                    </h3>
                    <DisclosurePanel className="pt-6">
                      <div className="space-y-4">
                        {section.options.map((option, optionIdx) => (
                          <div key={option.value} className="flex gap-3">
                            <div className="flex h-5 shrink-0 items-center">
                              <div className="group grid size-4 grid-cols-1">
                                <input
                                  id={`filter-${section.id}-${optionIdx}`}
                                  name={option.value}
                                  parent={section.name}
                                  onChange={handleChange}
                                  type="checkbox"
                                  checked={formData[section.name].includes(option.value)}
                                  className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                                />
                                <svg
                                  fill="none"
                                  viewBox="0 0 14 14"
                                  className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25"
                                >
                                  <path
                                    d="M3 8L6 11L11 3.5"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="opacity-0 group-has-[:checked]:opacity-100"
                                  />
                                  <path
                                    d="M3 7H11"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="opacity-0 group-has-[:indeterminate]:opacity-100"
                                  />
                                </svg>
                              </div>
                            </div>
                            <label htmlFor={`filter-${section.id}-${optionIdx}`} className="text-sm text-gray-600">
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </DisclosurePanel>
                  </Disclosure>
                ))}
              </form>

              {/* Product grid */}
              <div className="lg:col-span-3">
                <ProductList products={products} setPageNo={setPageNo} totalPages={totalPages} pageNo={pageNo}/>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
