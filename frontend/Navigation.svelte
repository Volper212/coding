<script lang="ts">
    import { Route, link } from "svelte-routing";
    import Example from "./routes/Example.svelte";
    import Puzzle from "./routes/Puzzle.svelte";
    import CreatePuzzle from "./routes/CreatePuzzle.svelte";
</script>

<Route>
    <main>
        <div>
            <div class="title" id="first">Rankingi</div>
            <table>
                <tr>
                    <th>Miejsce</th>
                    <th>Nick</th>
                    <th>Ranking</th>
                </tr>
                <tr>
                    <td>test</td>
                    <td>test</td>
                    <td>test</td>
                </tr>
                <tr>
                    <td>test</td>
                    <td>test</td>
                    <td>test</td>
                </tr>
                <tr>
                    <td>test</td>
                    <td>test</td>
                    <td>test</td>
                </tr>
                <tr>
                    <td>test</td>
                    <td>test</td>
                    <td>test</td>
                </tr>
                <tr>
                    <td>test</td>
                    <td>test</td>
                    <td>test</td>
                </tr>
            </table>
        </div>
        <div>
            <div class="title">Twoje statystyki</div>
            <div class="stats">
                <div>
                    <span class="code">liczba punktów: <span class="color">1599</span></span><br />
                    <span class="code"
                        >miejsce w ogólnym rankingu: <span class="color">4</span></span
                    >
                </div>
                <div>Zdjęcie</div>
                <div class="button">
                    <a href="/puzzle" use:link><button>Graj dalej</button></a>
                </div>
            </div>
        </div>
        <div>
            <div class="title">
                Twoje zadania <a href="/createPuzzle" use:link><button class="plus">+</button></a>
            </div>
            <div class="tables">
                <div>
                    <div class="tag">{"<Znajdź_błąd />"}</div>
                    <table>
                        <tr>
                            <th>Nazwa zadania</th>
                            <th>Ranking zadania</th>
                            <th>Liczba wyświetleń</th>
                        </tr>
                        <tr>
                            <td>test</td>
                            <td>test</td>
                            <td>test</td>
                        </tr>
                        <tr>
                            <td>test</td>
                            <td>test</td>
                            <td>test</td>
                        </tr>
                        <tr>
                            <td>test</td>
                            <td>test</td>
                            <td>test</td>
                        </tr>
                    </table>
                </div>
                <div>
                    <div class="tag">{"<Napisz_program />"}</div>
                    <table>
                        <tr>
                            <th>Nazwa zadania</th>
                            <th>Ranking zadania</th>
                            <th>Liczba wyświetleń</th>
                        </tr>
                        <tr>
                            <td>test</td>
                            <td>test</td>
                            <td>test</td>
                        </tr>
                        <tr>
                            <td>test</td>
                            <td>test</td>
                            <td>test</td>
                        </tr>
                        <tr>
                            <td>test</td>
                            <td>test</td>
                            <td>test</td>
                        </tr>
                    </table>
                </div>
                <div>
                    <div class="tag">{"<Uzupełnij_lukę />"}</div>
                    <table>
                        <tr>
                            <th>Nazwa zadania</th>
                            <th>Ranking zadania</th>
                            <th>Liczba wyświetleń</th>
                        </tr>
                        <tr>
                            <td>test</td>
                            <td>test</td>
                            <td>test</td>
                        </tr>
                        <tr>
                            <td>test</td>
                            <td>test</td>
                            <td>test</td>
                        </tr>
                        <tr>
                            <td>test</td>
                            <td>test</td>
                            <td>test</td>
                        </tr>
                    </table>
                </div>
                <div>
                    <div class="tag"> {"<Co_się_wyświetli />"} </div>
                    <table>
                        <tr>
                            <th>Nazwa zadania</th>
                            <th>Ranking zadania</th>
                            <th>Liczba wyświetleń</th>
                        </tr>
                        <tr>
                            <td>test</td>
                            <td>test</td>
                            <td>test</td>
                        </tr>
                        <tr>
                            <td>test</td>
                            <td>test</td>
                            <td>test</td>
                        </tr>
                        <tr>
                            <td>test</td>
                            <td>test</td>
                            <td>test</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </main>
</Route>
<Route path="/createPuzzle">
    <CreatePuzzle />
</Route>
<Route path="/example">
    <Example />
</Route>
<Route path="/puzzle">
    <Puzzle />
</Route>

<style lang="scss">
    @use "./variables.scss" as *;

    main {
        font-size: 0.8vw;
        padding: 0 2vw;
        height: 80vh;
        display: flex;
        justify-content: space-between;

        div {
            .title {
                border-bottom: 1px solid $primary-color;
                width: 100%;
                text-align: right;
                font-size: 1.5vw;
            }

            #first {
                text-align: left;
            }

            .plus {
                padding: 0;
                width: 2.5vw;
                height: 2.5vw;
            }

            .code {
                color: $primary-color;
                .color {
                    color: $secondary-color;
                }
            }

            table {
                color: $primary-color;
                width: 100%;

                th {
                    padding-right: 3vw;
                    padding-bottom: 0.2vw;
                }

                th:last-child {
                    padding-right: 0;
                }

                td:first-child {
                    color: $primary-color;
                }

                td {
                    color: $secondary-color;
                }
            }
        }
    }

    .stats {
        margin-top: 1vw;
        height: 80%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .tables {
        height: 90%;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;

        table {
            margin-left: 1vw;
        }
    }

    .tag {
        margin-bottom: 0.5vw;
    }

    .button {
        text-align: center;
    }
</style>
