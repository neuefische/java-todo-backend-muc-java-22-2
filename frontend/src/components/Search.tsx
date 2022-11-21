import {ChangeEvent} from "react";

type SearchProps = {
    handleSearchQueryChange(searchQuery: string): void
}

export default function Search(props: SearchProps) {

    // Diese Funktion übergibt Suchanfragen an die Elternklasse
    // und zwar SOFORT!
    // (Deshalb kein State)
    function handleSearchQueryChange(event: ChangeEvent<HTMLInputElement>) {
        props.handleSearchQueryChange(event.target.value)
    }

    return(
        <section>
            <input onChange={handleSearchQueryChange} />
        </section>
    )
}