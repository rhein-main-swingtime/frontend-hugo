export const GOOGLE = 'google'
export const FACEBOOK = 'facebook'
export const INSTAGRAM = 'instagram'

const key = 'rmst:forwardingPermissions'

interface forwardingPermissionStorage {
    [key: string]: 'yes' | 'no'
}

export default class RedirectionPermissionHelper {
    private getComplete (): forwardingPermissionStorage {
        return JSON.parse(localStorage.getItem(key) || '{}')
    }

    private getValue (key: string): 'yes' | 'no' {
        return this.getComplete()[key] || 'no'
    }

    public allowForwarding (target: string): void {
        const complete: forwardingPermissionStorage = this.getComplete()
        complete[target] = 'yes'
        sessionStorage.setItem(key, JSON.stringify(complete))
    }

    public isForwardingPermitted (linkTarget: string): boolean {
        const key = (new URL(linkTarget)).hostname
        return this.getValue(key) === 'yes'
    }
}
