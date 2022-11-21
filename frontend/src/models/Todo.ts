// Datenmodell
export type Todo = {
    // Das Fragezeichen sagt,
    // "Alles kann, nichts muss"
    // D.h. die ID ist optional
    id?: string,
    description: string,
    // Mit dem "Pipe Operator" können wir Möglichkeiten festlegen
    status: "OPEN" | "IN_PROGRESS" | "DONE"
}