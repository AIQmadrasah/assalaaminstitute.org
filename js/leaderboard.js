window.addEventListener('load', async () => {
    const host = await new Promise((res) => {
        fetch('/leaderboard-sys/HOST')
        .then((response) => response.text())
        .then((data) => res(data));
    })

    const leaderboard = await new Promise((res) => fetch(`${host}/leaderboard?pass=aiqftw`).then((res) => res.json()).then((data) => res(data)));
    leaderboard.sort((a, b) => a.points - b.points);
    console.log(leaderboard);
    leaderboard.forEach((entry) => {
        const parent = document.querySelector('.mainContent');
        const html = 
        `<tr class="ee-${entry.name.replaceAll(' ', '_')} hover">
            <th scope="row">${entry.name}</th>
            <td>${entry.sabaq}</td>
            <td>${entry.sabaqpara}</td>
            <td>${entry.dour}</td>
            <td>${entry.attendance}</td>
            <td>${entry.clothing}</td>
            <td>${entry.points}</td>
        </tr>`;
        
        parent.insertAdjacentHTML('beforeend', html);

        document.querySelector(`.ee-${entry.name.replaceAll(' ', '_')}`)?.addEventListener('click', () => {
            window.location.href = `/profile?name=${entry.name}`
        })
    })
})