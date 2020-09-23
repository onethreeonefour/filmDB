import React, { useState } from 'react'
import { Input, Button } from 'antd'


function SearchFeature(props) {

    const [SearchTerms, setSearchTerms] = useState("")

    const onChangeSearch = (e) => {
        setSearchTerms(e.currentTarget.value)
    }

    return (
        <div style={{ display: 'flex', width: '80vw', margin: 'auto' }}>
            <Input
                value={SearchTerms}
                onChange={onChangeSearch}
                required={true}
                placeholder="Search here.."
                onPressEnter={() => {
                    if (SearchTerms.length !== 0) {
                        props.refreshFunction(SearchTerms)
                    }
                }
                }

            />
            <Button onClick={() => {
                if (SearchTerms.length !== 0) {
                    props.refreshFunction(SearchTerms)
                }
            }
            }>Search</Button>
        </div>
    )
}

export default SearchFeature
