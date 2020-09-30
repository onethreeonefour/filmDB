import React, { useState } from 'react'
import { Input, Button } from 'antd'


function SearchFeature(props) {

    const [SearchTerms, setSearchTerms] = useState("")

    const onChangeSearch = (e) => {
        setSearchTerms(e.currentTarget.value)
    }

    return (
        <div style={{ display: 'flex', width: '60vw', margin: 'auto' }}>
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
                style={{ backgroundColor: "transparent", color: "white", fontSize: "1rem", border: "0", borderBottom: "2px solid white" }}
            />

            <Button style={{ backgroundColor: "transparent", color: "white", border: "0", fontSize:"1.25rem" }} onClick={() => {
                if (SearchTerms.length !== 0) {
                    props.refreshFunction(SearchTerms)
                }
            }
            }>Search</Button>

        </div>
    )
}

export default SearchFeature
