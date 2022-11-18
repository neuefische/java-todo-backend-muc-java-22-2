import {ChangeEvent} from "react";

type SearchProps = {
    handleSearchChange(searchQuery: string): void
}

export default function Search(props: SearchProps) {

    function handleSearchChange(event: ChangeEvent<HTMLInputElement>) {
        props.handleSearchChange(event.target.value)
    }

    return(
        <section>
            Suchen: <input onChange={handleSearchChange} />
        </section>
    )
}