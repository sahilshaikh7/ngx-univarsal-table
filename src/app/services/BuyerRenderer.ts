
export function BuyerRenderer(field, value) {
    if (field == 'phone-icon') {
        return '<span class="material-icons" style="color:#003C9E; cursor: pointer;">call</span>';
    }
    if (field == 'three-dot-icon') {
        return '<span class="material-icons" style="cursor: pointer;">more_vert</span>';
    }
    if (field == 'username') {
        return '<span style="color:#003C9E;">' + value + '</span>';
    }
    if (field == 'participation_status') {
        switch (value) {
            case 'Active':
                return '<span style=" color: #204808; background-color: #E8F6C9;padding: 8px;border-radius: 8px;display: inline-block;">' + value + '</span>';
            case 'In Active':
                return '<span style=" color: #B3280D; background-color: #FCE6CE;padding: 8px;border-radius: 8px;display: inline-block;">' + value + '</span>';
            case 'In Complete':
                return '<span style=" color: #764612; background-color: #FCEFC7;padding: 8px;border-radius: 8px;display: inline-block;">' + value + '</span>';
            case 'Completed':
                return '<span style=" color: #003C9E; background-color: #C8E2FA;padding: 8px;border-radius: 8px;display: inline-block;">' + value + '</span>';
        }
    }
}