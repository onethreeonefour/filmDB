import React, { useState } from 'react'
import { Input, Button } from 'antd'


function SearchFeature(props) {

    const [SearchTerms, setSearchTerms] = useState("")

    const onChangeSearch = (e) => {
        setSearchTerms(e.currentTarget.value)
    }

    return (
        <div className="search-function">
            <Input
                value={SearchTerms}
                onChange={onChangeSearch}
                required={true}

                onPressEnter={() => {
                    if (SearchTerms.length !== 0) {
                        props.refreshFunction(SearchTerms)
                    }
                }
                }
                style={{ backgroundColor: "transparent", color: "white", fontSize: "1.5rem", border: "0", borderBottom: "2px solid #71B48D" }}
            />
            <Button size='large' className="search-button" onClick={() => {
                if (SearchTerms.length !== 0) {
                    props.refreshFunction(SearchTerms)
                }
            }

            }>Search</Button>

        </div>
    )
}

export default SearchFeature
